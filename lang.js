window.onload = function() {
    ///////////////////
    /// PARSER CORE ///
    ///////////////////

    // There is an annotated configuration object in the GRAMMAR section below
    function Parser(config) {
        var prio = this.priorities = config.priorities;
        prio["boundary:$"] = [-1, -1];
        this.re = config.re;
        this.toktypes = config.toktypes;
        config.blocks.forEach(function (defs) {
            var parts = defs.split(" ");
            prio[parts.shift()] = [10000, 0];
            prio[parts.pop()] = [0, 10001, true];
            parts.forEach(function (part) {prio[part] = [0, 0];});
        });
        var level = 5;
        config.tower.forEach(function (ops) {
            ops[1].split(" ").forEach(function (op) {
                var pfx = op.substring(0, 2) === "P:";
                prio[op] = [pfx ? 10000 : level, level - ops[0]];
                if (pfx && !prio[op.substring(2)])
                    prio[op.substring(2)] = prio[op];
            });
            level += 5;
        });
    }

    // The return value of tokenize("a + 6 * 10") is:
    //   [{token: "$", type: "boundary"},
    //    {token: "a", type: "id"},
    //    {token: "+", type: "op"},
    //    {token: "6", type: "num"},
    //    {token: "*", type: "op"},
    //    {token: "10", type: "num"},
    //    {token: "$", type: "boundary"}]
    // In everything that follows, tok(a) will stand for {token: "a", type: "id"},
    // tok(*) for {token: "*", type: "op"}, and so on.
    Parser.prototype.tokenize = function (text) {
        var m; var last = "op";
        var results = [{token: "$", type: "boundary"}];
        while (m = this.re.exec(text)) {
            var type = this.toktypes[m.slice(1).indexOf(m[0])];
            if (type === "comment") continue;
            var tok = {token: m[0], type: type};
            // An "op" token followed by an "op" token makes the second prefix
            // unless the first is marked as suffix.
            if (last.type === "op" && type === "op" && !this.getPrio(last)[2])
                tok.prefix = true;
            results.push(tok);
            last = tok;
        }
        results.push({token: "$", type: "boundary"});
        return results;
    }

    Parser.prototype.getPrio = function (t) {
        // getPrio returns a pair of priorities [leftPrio, rightPrio]
        // leftPrio is used to compare with operators on the left side
        // rightPrio is used to compare with operators on the right side
        // Prefix operators can have different priority from infix ones.
        var x; var pfx = t.prefix && "P:" || "";
        if (x = this.priorities[t.type + ":" + t.token]
            ||  this.priorities[pfx + t.token]
            ||  this.priorities[t.token]
            ||  this.priorities["type:" + t.type])
            return x;
        throw SyntaxError("Unknown operator: " + t.token);
    }

    Parser.prototype.order = function (a, b) {
        // Compare the priorities of operators a and b when found in that order
        // To help visualize what the return value means, imagine that
        // <• and •> are matching brackets, so when you see <• you insert
        // "(" after a, and when you see •> you insert ")" before b.
        // And when you see =•, you just skip over it.
        if (a.type === "boundary" && b.type === "boundary") return "done";
        var pa = this.getPrio(a)[1];
        var pb = this.getPrio(b)[0];
        if (pa < pb)  return "<•";
        if (pa > pb)  return "•>";
        if (pa == pb) return "=•";
    }

    Parser.prototype.parse = function (text, finalize) {
        // This algorithm is based on operator precedence grammars:
        // http://en.wikipedia.org/wiki/Operator-precedence_grammar
        // http://dl.acm.org/citation.cfm?id=321179

        // Supposing finalize is the identity function and that we are
        // using conventional priority settings, the return value of parse
        // basically looks like this:

        // "a + b * c" ==> [tok(a), tok(+), [tok(b), tok(*), tok(c)]]
        // "a + -b"    ==> [tok(a), tok(+), [null, tok(-), tok(b)]]
        // "(a) + b"   ==> [[null, tok("("), tok(a), tok(")"), null], tok(+), tok(b)]
        // "a[b]"      ==> [tok(a), tok([), tok(b), tok(]), null]

        // EXCEPT THAT The algorithm interprets identifiers and literals
        // as nullary operators, so instead of tok(a) what you actually
        // get is [null, tok(a), null]. (Rule of thumb: even indexes
        // (0-based) are always null or a subnode, and odd indexes are
        // always tokens). To clarify:
        // "a + b" ==> [[null, tok(a), null], tok(+), [null, tok(b), null]]

        // The finalize function is given a subnode at the moment of
        // completion and should return what to replace it with. Note that
        // it's called inside out: the subnodes of what you get in
        // finalize have already been processed.

        var tokens = this.tokenize(text);
        var next = tokens.shift.bind(tokens);
        var stack = [];
        // middle points to the handle between the two operators we are
        // currently comparing (null if the two tokens are consecutive)
        var middle = null;
        var left = next();
        var right = next();
        var current = [null, left];
        while (true) {
            switch (this.order(left, right)) {
            case "done":
                // Returned when comparing boundary tokens
                return middle;
            case "<•":
                // Open new handle; it's like inserting "(" between left and middle
                stack.push(current);
                current = [middle, right];
                middle = null;
                left = right;
                right = next();
                break;
            case "•>":
                // Close current handle; it's like inserting ")" between middle and right
                // and then the newly closed (...) block becomes the new middle
                current.push(middle);
                middle = finalize(current);
                current = stack.pop()
                left = current[current.length - 1];
                break;
            case "=•":
                // Merge to current handle and keep going
                current.push(middle, right);
                middle = null;
                left = right;
                right = next();
                break;
            }
        }
    }

    ////////////////////////
    /// INTERPRETER CORE ///
    ////////////////////////

    function Env(parent) {
        this.parent = parent;
        // I use JS's prototype inheritance to implement looking up
        // bindings in the parent scope.
        this.bindings = parent ? Object.create(parent.bindings) : {};
        this.macros = parent ? parent.macros : [];
    };

    Env.prototype.resolve = function (sym) {
        var res = this.bindings[sym];
        // We must avoid resolving default fields of objects like toString
        if (res !== {}[sym]) return res
        else throw Error("Could not resolve symbol: " + sym);
    };

    Env.prototype.register = function (guard, handler) {
        this.macros.push({guard: guard, handler: handler});
    };

    Env.prototype.getHandler = function (signature) {
        // signature is a string like "E + E" or "E ( E ) _" that
        // describes the kind of node we're trying to handle. E stands for
        // an expression whereas _ means there is nothing there.
        // Handlers either match the exact string or a regular expression
        for (var i = 0; i < this.macros.length; i++) {
            var m = this.macros[i];
            if (m.guard instanceof RegExp && signature.match(m.guard)
                || m.guard === signature)
                return m.handler;
        }
        throw Error("Unknown signature: " + signature);
    };

    Env.prototype.run = function(node) {
        switch (node.type) {
        case "op":
        case "id":  return this.resolve(node.token);
        case "num": return parseInt(node.token);
        case "str": return node.token.substring(1, node.token.length - 1).replace('\\"', '"');
        case "inner":
            // Handler for the node's signature is called with the node as
            // its first argument and the node's actual arguments as its
            // second, ... arguments. For instance, the handler for "a + b"
            // would be called as handler.call(this, node, a, b).
            return this.getHandler(node.signature).apply(this, [node].concat(node.args));
        default:
            throw SyntaxError("Unknown leaf type: " + node.type);
        }
    };

    function finalize(node) {
        // This is given to Parser::parse as a callback. It reformats the
        // parser's output to be a bit easier to manipulate.
        // a + b ==> [[null, tok(a), null], tok(+), [null, tok(b), null]] (parser)
        //       ==> {type: "inner", args: [tok(a), tok(b)], signature: "E + E"} (finalize)
        if (node.length === 3 && node[0] === null && node[2] === null)
            return node[1];
        return {type: "inner",
                orig: node,
                args: node.filter(function (x, i) { return i % 2 == 0; }),
                signature: node.map(function (x, i) {
                    if (i % 2 == 0)
                        return x === null ? "_" : "E"
                    else 
                        return x.token
                }).join(" ")};
    }

    ///////////////
    /// GRAMMAR ///
    ///////////////

    var op_re = "([\\(\\)\\[\\]\\{\\},;\n]|[!@$%^&*|/?.:~+=<>-]+)"
    var id_re = "([A-Za-z_][A-Za-z_0-9]*)"
    var num_re = "([0-9]+)"
    var str_re = "(\"(?:[^\"]|\\\\.)*\")"
    var cmnt_re = "(#.*(?:$|(?=\n)))"
    var re = new RegExp([op_re, id_re, num_re, str_re, cmnt_re, "([^ ])"].join("|"), "g");
    var toktypes = ["op", "id", "num", "str", "comment", "other"];

    var config = {
        // This is the regular expression to tokenize with. Each group of
        // the regexp corresponds to a token type.
        re: re,

        // These are the token types for each group in the regexp.
        toktypes: toktypes,

        // These are individual priority settings for a set of operators.
        // id, num and str are to be treated as nullary, which means
        // giving them maximal priority on each side. The first priority
        // is when the operator is compared with another on its left, the
        // second is for comparison with an operator on its right.
        priorities: {
            "boundary:$":    [-1,   -1],     // unused
            "type:id":       [20001, 20000],
            "type:num":      [20001, 20000],
            "type:str":      [20001, 20000],
        },

        // These are all treated as bracket types. The operators between
        // the first and last are "middle" operators. Essentially, given
        // these definitions, "let in end" will assign the following
        // priorities: {let: [10000, 0], in: [0, 0], end: [0, 10001]}.
        // For "let x in y end" the parser will thus output:
        // [null, tok(let), tok(x), tok(in), tok(y), tok(end), null]
        // An operator can only have one role, so none of the operators
        // specified here should be in the tower.
        blocks: [
            "( )", "[ ]", "{ }", "begin end",
            "if then elif else end", "let in end"
        ],

        // [-1, "P:- * /"] means that prefix - and infix * and /
        //     have the same priority and are left associative.
        //     This translates to priority [p, p + 1].
        // [1, "^"] means that infix ^ is right associative
        //     This translates to priority [p, p - 1].
        // [0, ", ; \n"] means that , ; and \n are list associative
        //     This translates to priority [p, p].
        // The groups are listed from *lowest* to *highest* priority
        tower: [
            [0, ", ; \n"], [1, "= each ->"],
            [-1, "or"], [-1, "and"], [-1, "P:not"],
            [-1, "== != < <= >= >"], [-1, ".."],
            [-1, "+ -"], [-1, "P:- * /"], [1, "^"],
            [-1, "type:op"] // everything else
        ]
    }

    var parser = new Parser(config);

    ///////////////////
    /// INTERPRETER ///
    ///////////////////

    var base = new Env();

    function applyCall(env, fargs) {
        var fn = env.run(fargs[0]);
        return fn.apply(null, fargs[1].map(function (arg) {
            if (fn.lazy) return function () {return env.run(arg);};
            else         return env.run(arg);
        }));
    }

    function makeFunction(env, argnames, body) {
        return function () {
            var args = arguments;
            var e = new Env(env);
            argnames.forEach(function (n, i) {
                e.bindings[n.token] = args[i];
            });
            return e.run(body);
        };
    }

    function extractArgs(guard, node, strict) {
        // This checks that the node has a certain form and returns a list
        // of its non-null arguments. For instance,
        // extractArgs("E + E", node) will check that node is an addition
        // and will return a list of its two operands. If it is not an
        // addition, it returns null or throws an error depending on the
        // value of strict.
        if (node && (node.signature
                     && guard instanceof RegExp
                     && node.signature.match(guard)
                     || guard === node.signature))
            return node.args.filter(function (x) { return x !== null; });
        if (strict)
            throw Error("Expected '"+guard+"' but got '"+node.signature+"'");
        return null;
    }

    function listify(node) {
        // Basically if given "a, b, c" this returns [a, b, c], and given
        // "a" this returns [a]. It's a kind of normalization, really.
        return extractArgs(/^[E_]( [;,\n] [E_])+$/, node) || (node ? [node] : []);
    }

    function normalizeCall(node) {
        // Given either "a + b" or "(+)(a, b)" this returns [+, [a, b]].
        var args;
        if (args = extractArgs(/^[E_] [^ ]+ [E_]$/, node))
            return [node.orig[1], args];
        else if (args = extractArgs(/^E \( [E_] \) _$/, node))
            return [args[0], listify(args[1])];
        return null;
    }

    function normalizeAssignment(node) {
        // Given "a = b" this returns [a, null, b]
        // Given "f(a) = b" this returns [f, [a], b]
        var lr = extractArgs("E = E", node, true);
        var fargs;
        if (fargs = normalizeCall(lr[0])) return [fargs[0], fargs[1], lr[1]];
        else return [lr[0], null, lr[1]];
    }

    // The language's basic features follow. I think they are mostly
    // straightforward.

    base.register(/^[E_]( [;,\n] [E_])+$/, function (node) {
        var self = this;
        return listify(node).map(function (arg) { return self.run(arg); }).pop();
    });

    base.register("_ ( E ) _", function (node, _, x, _) { return this.run(x); });
    base.register("_ begin E end _", function(node, _, x, _) {return this.run(x);});
    base.register(/^E \( [E_] \) _$/, function (node, f, x, _) {
        return applyCall(this, normalizeCall(node));
    });

    // [a, b, ...] defines a list
    base.register("_ [ E ] _", function (node, _, x, _) {
        var self = this;
        return listify(x).map(function (x) { return self.run(x); });
    });
    // a[b] indexes a list; notice the E before the [, unlike above
    base.register("E [ E ] _", function (node, l, x, _) {
        return this.run(l)[this.run(x)];
    });

    base.register(/^_ if E then E( elif E then E)* else E end _$/,
        function (node) {
            var args = [].slice.call(arguments, 2, -1);
            for (var i = 0; i < args.length - 1; i += 2) {
                if (this.run(args[i])) return this.run(args[i + 1]);
            }
            return this.run(args[i]);
        });

    base.register("_ let E in E end _", function (node, _, defn, body, _) {
        var e = new Env(this);
        listify(defn).forEach(function (d) {
            var args = normalizeAssignment(d);
            if (args[1])
                e.bindings[args[0].token] = makeFunction(e, args[1], args[2]);
            else
                e.bindings[args[0].token] = e.run(args[2]);
        });
        return e.run(body);
    });

    base.register("E -> E", function (node, defn, body) {
        var argnames = listify((extractArgs("_ ( E ) _", defn) || [defn])[0]);
        return makeFunction(this, argnames, body);
    });

    base.register("E each E", function (node, lst, op) {
        return this.run(lst).map(this.run(op));
    });

    // Default fallback for unknown binary operators
    base.register(/^[E_] [^ ()\[\]\{\}]+ [E_]$/, function (node) {
        return applyCall(this, normalizeCall(node));
    });

    function lazy(f) { f.lazy = true; return f; }
    // These are the global bindings of the language.
    base.bindings = {
        "+":  function (x, y) { return x + y; },
        "-":  function (x, y) { return y === undefined ? -x : x - y; },
        "*":  function (x, y) { return x * y; },
        "/":  function (x, y) { return x / y; },
        "^":  Math.pow,
        "==": function (x, y) { return x == y; },
        "!=": function (x, y) { return x != y; },
        "<":  function (x, y) { return x < y; },
        "<=": function (x, y) { return x <= y; },
        ">":  function (x, y) { return x > y; },
        ">=": function (x, y) { return x >= y; },
        "..": function (start, end) {
            return Array.apply(null, Array(end - start)).map(function (_, i) {
                return i + start;
            });
        },
        and:  lazy(function (x, y) { return x() && y(); }),
        or:   lazy(function (x, y) { return x() || y(); }),
        not:  function (x) { return !x; },
        log:  Math.log,
        sin:  Math.sin,
        cos:  Math.cos,
        tan:  Math.tan,
        true: true,
        false: false
    }

    function exec(s) {
        var tree = parser.parse(s, finalize);
        var e = new Env(base);
        return e.run(tree);
    }

    ///////////////////
    // DISPLAY STUFF //
    ///////////////////

    base.bindings["print"] = function () {
        [].slice.call(arguments).forEach(function (arg) {
            var box = document.createElement("div");
            box.appendChild(document.createTextNode(arg));
            document.getElementById("result").appendChild(box);
        });
        return arguments[arguments.length - 1];
    }

    function makeNode(type, cls) {
        var box = document.createElement(type);
        box.className = cls;
        [].slice.call(arguments, 2).forEach(function (x) {
            box.appendChild(x);
        });
        return box;
    }
    function txt(t) {
        return document.createTextNode(t);
    }

    function simplify(node) {
        if (node[1].token.match(/[,;\n]/)) {
            var results = [];
            for (var i = 0; i < node.length; i++) {
                if (node[i] === null) {
                    if (results.pop() === undefined) i++;
                }
                else results.push(node[i]);
            }
            return results;
        }
        return node;
    }

    function display(node) {
        if (!node) {
            return makeNode("span", "nil");
        }
        if (node.length === 3 && node[0] === null && node[2] === null) {
            return makeNode("span", node[1].type, txt(node[1].token));
        }
        node = simplify(node);
        if (node.length === 1) { return node[0]; }
        console.log(node);
        var box = makeNode("span", "inner");
        node.forEach(function (x, i) {
            if (i % 2 == 1) {
                var op = makeNode("span", "op", txt(x.token.replace("\n", "↵")));
                box.appendChild(op);
            }
            else
                box.appendChild(x || txt(""));
        });
        return box;
    }

    function processInput() {
        var s = document.getElementById("expr").value;
        var res = document.getElementById("ast");
        res.innerHTML = "";
        res.appendChild(parser.parse(s, display));
        var res = document.getElementById("result");
        res.innerHTML = "";
        try {
            res.appendChild(txt(exec(s)));
        }
        catch (e) {
            res.appendChild(txt("ERROR: " + e.message));
        }
    }

    var inputbox = document.getElementById("expr");
    var examples = document.getElementById("examples");
    [].slice.call(examples.children).forEach(function (child, i) {
        var button = document.createElement("button");
        button.appendChild(txt(i || "Clear"));
        button.onclick = function (e) {
            inputbox.value = child.value;
        };
        examples.replaceChild(button, child);
        if (i === 1) { inputbox.value = child.value; }
    });

    document.getElementById("evaluate").onclick = processInput;
}
