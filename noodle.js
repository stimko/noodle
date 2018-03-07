var node = (val) => ({ value: val, left: null, right: null });

var tree = node(4);
tree.left = node(4);
tree.left.left = node(4);
tree.left.right = node(9);
tree.right = node(5);
tree.right.right = node(10);

var ans = 0;

var length = (node) => {
  if (!node) {
    return 0;
  }

  var left = length(node.left);
  var right = length(node.right);

  var leftmax = 0, rightmax = 0;

  if (node.left && node.left.value === node.value) {
    leftmax += left + 1;
  }

  if (node.right && node.right.value === node.value) {
    rightmax += right + 1;
  }

  ans = Math.max(ans, leftmax + rightmax);
  return Math.max(leftmax, rightmax);
}
length(tree);
console.log(ans);

var iamaword = "iamaword";

function isValid(str) {

  var lengthOfString = str.length;
  var startIndex = 0
  var endIndex = 1;

  while (startIndex <= lengthOfString) {
    if (inDict(str.substring(startIndex, endIndex))) {
      startIndex++;
      endIndex = startIndex + 1;
    } else {
      endIndex++;

      if (endIndex >= lengthOfString) {
        return false;
      }
    }
  }
}

function inDict(str) {
  return false;
}

console.log(isValid(iamaword));

// var test = {"hi":{"ok":"blah"}, "yo":{"what":"hey"}};

// function findDeep(dict, test, index = 0, keys = Object.keys(dict)) {        
//   var item = dict[keys[index]];

//   if(index > keys.length) {
//       return null; // End of siblings. No match.
//   }

//   if(test(item)) {
//       return item; // Match.
//   }

//   if(item !== null && typeof item === 'object') { // null is an object.
//     var result = findDeep(item, test); // Children.
//     if(result) {
//       return result; // Short circuit, when item found.
//     }
//   }

//   return findDeep(dict, test, ++index); // Siblings.
// }


// recurse(test, hey);

// function test(tree, callback) {
//   var queue=[this];
//   var n;

//   while(queue.length>0) {

//     n = queue.shift();
//     //callback(n.value);

//     if (!n.children) {
//       continue;
//     }

//     for (var i = 0; i< n.children.length; i++) {
//        queue.push(n.children[i]);
//     }
//   }
// };


// There is likely thousands of items
// There could be more than 3 keys but not a large amount
// items = [
//   {color: 'red', type: 'tv', age: 3},
//   {color: 'silver', type: 'phone', age: 1}
// ]

// // There is likely thousands of filters
// excludes = [
//   {k: 'color', v: 'silver'},
//   {k: 'type', v: 'tv'},
// ]

// function excludeItems(items, excludes) {
//    excludes.forEach(pair => {
//       items = items.filter(item => item[pair.k] !== item[pair.v]);
//    });
//    return items;
// }

// 1. Describe what this function is doing.
// 2. What is wrong with this function?
// 3. How would you optimize it? 


var nodeR = {
  val: 100,
  left: {
    val: 2,
    right: {
      val: 4,
      left: {
        val: 10
      }
    },
    left: {
      val: 9,
      right: {
        val: 25
      }
    }
  },
  right: {
    val: 44,
    left: {
      val: 5,
      left: {
        val: 2000
      },
      right: {
        val: 1000
      }
    },
    right: {
      val: 33,
      left: {
        val: 4000
      },
      right: {
        val: 6000
      }
    }
  }
}


// const sumK = function(node, k) {
//   const _sumK = function(arrNode, k, s, lvl){
//    if(!arrNode){
//      return s;
//    } else {
//      var head = arrNode[0];
//      var newArr = arrNode.slice(1);

//      if(!head){
//        return _sumK(newArr, s);
//      } else if(head.left || head.right) {
//        const newHeight = head.height + 1;
//        const h = [
//          {node: head.node.left, height: newHeight}, 
//          {node: head.node.right, height: newHeight}
//        ].concat(newArr);
//        return _sumK(h, k, (head.height > k ? head.node.val : 0) + s);
//      } else {
//        return _sumK(newArr.length ? newArr : null, (head.height > k ? head.node.val : 0) + s);
//      }
//    }
//  }

//  return _sumK([{node:node, height: 1}], k, 0, 1)
// }


const size = function (node) {
  const _size = function (arrNode, s) {
    if (!arrNode) {
      return s;
    } else {
      var head = arrNode[0];
      var newArr = arrNode.slice(1);

      if (!head) {
        return _size(newArr, s);
      } else if (head.left || head.right) {
        const h = [head.left, head.right].concat(newArr);
        return _size(h, ++s);
      } else {
        return _size(newArr.length ? newArr : null, ++s);
      }
    }
  }
  return _size([node], 0)
}

console.log(size(nodeR));

// function buildMatrix(){
//   var matrix = [[1]];
//   var square = 1;
//   var length = 8;
//   var dimension = 2;
//   var currentPosition = [0, 0];

// }

// function buildSquare(matrix, dimension, length){
//   buildRight(matrix, (dimension - 1), length);
//   buildTop(matrix, dimension, length);
//   buildLeft(matrix, dimension, length);
//   buildBottom(matrix, dimension, length);
// }


// function buildRight(){

// }

// function buildTop(){

// }

// function buildLeft(){

// }

// function buildBottom(){

// }

// function nextNumber(matrix, x, y){

// }


// function buildMatrix(){
//   const end = 265149;
//   let start = 1;
//   let square = 0;

//   while(start < end){
//     square++;
//     start += (square * 8)
//   }

    //  const prevLength = (square-1) * 8;
    //  const sideLength = (start - prevLength ) / 4;
    //  const isOnLeft = (e) => e < (start - sideLength) && e > (start - (sideLegnth * 2));
    //  const isOnRight = (e) => e < prevLength && e > (start - (sideLegnth * 2));
    //  const isOnSide = isOnLeft(end) || isOnRight(end)  ? true : false;

    //  if(isOnSide){

    //  }
//   console.log(start, square);

// }

// buildMatrix();



// var input = [
//  "1236 741 557 1029 144 101 1968 2159 1399 80 1139 1167 1695 82 90 2236",
// "2134 106 107 1025 584 619 191 496 80 352 351 2267 1983 1973 97 1244",
// "3227 179 691 3177 172 1636 3781 2020 3339 2337 189 3516 1500 176 159 3279",
// "201 688 364 180 586 659 623 577 188 265 403 670 195 720 115 37",
// "1892 1664 2737 2676 849 2514 923 171 311 218 255 2787 1271 188 1278 2834",
// "150 3276 204 603 3130 587 3363 3306 2890 127 176 174 383 3309 213 1620",
// "5903 3686 200 230 6040 4675 6266 179 5375 1069 283 82 6210 6626 6398 1954",
// "942 2324 1901 213 125 2518 655 189 2499 160 2841 2646 198 173 1841 200",
// "232 45 272 280 44 248 50 266 296 297 236 254 58 212 276 48",
// "563 768 124 267 153 622 199 591 204 125 93 656 198 164 797 506",
// "243 4746 1785 204 568 4228 2701 4303 188 4148 4831 1557 4692 166 4210 3656",
// "72 514 1572 172 1197 750 1392 1647 1587 183 1484 213 1614 718 177 622",
// "1117 97 2758 2484 941 1854 1074 264 2494 83 1434 96 2067 2825 2160 92",
// "2610 1290 204 2265 1374 2581 185 852 207 175 3308 1500 2898 1120 1892 3074",
// "2322 1434 301 2156 98 2194 587 1416 1521 94 1985 424 91 119 1869 1073",
// "66 87 176 107 2791 109 21 92 3016 2239 1708 3175 3210 2842 446 484"
// ];

// function checkSumDivisors(matrix){
//   return matrix.reduce(function(prev, next){
//     return prev + rowQuotient(next.split(' '));
//   }, 0);
// }

// function rowQuotient(row) {
//   var length = row.length;
//   var pivotPosition = 0;
//   var index = 0;
//   var found = false;
//   while(pivotPosition < length){
//     while(index < length){
//       if(pivotPosition !== index && parseInt(row[pivotPosition]) % parseInt(row[index]) === 0){
//         found = true;
//         break; 
//       }
//       index++;
//     }
//     if(found === true) break;
//     index = 0;
//     pivotPosition++;
//   }
//   return parseInt(row[pivotPosition]) / parseInt(row[index]);
// }

// console.log(checkSumDivisors(input));

// function checkSum(input){
//   return input.reduce(function(prev, next){
//     console.log(prev);
//     return prev + findSum(next);
//   }, 0)
// }


// function findSum(input){
//   var least;
//   var most;

//   input.split(" ").reduce(function(prev, next) {
//     next = parseInt(next);
//     if(prev){
//       prev = parseInt(prev);
//       least =  prev < next ? prev : next;
//       most = prev > next ? prev : next;
//     } else {
//       least = next < least ? next : least;
//       most = next > most ? next : most; 
//     }
//   });

//   return most - least;
// }

// console.log(checkSum(input));


// var input = "5228833336355848549915459366737982598312959583817455621545976784792489468198365998232722734876612332352376192813552949814275947575774339529811976644361517795586998319242241614813622734255797569571577699238592667287428166398221572885869416419682687759743978434571821267146514338394624525648338739929479912368172669885577319718389278168766844487948761697438722556857882433224393723131298876252626643517236883999115665656935521675772866516185899317132494716723615493476397115627687887665194781746377341468995954554518252916859227397693885254329628812355612487594445522395853551734567498838382248616137969637971369615443599973588326388792893969924855316437952313492551671545714262784738343517166544197194547173515155927244175447296474282154114951181648317875827525814453758846194548872789943372281952995222779173812444186491115426476188672253249744478946863317915136832199132868917891243591195719354721129116229164688256853628339233919671468781913167415624214152793864585332944468428849171876873433621524242289488135675313544498245498637424139153782925723745249728743885493877792648576673196889949568317234125863369187953788611841388353999875519172896329524346527265231767868839696693328273381772726782949166112932954356923757485139367298699922984925977724972944277991686823219295939734313874834861796179591659174726432357533113896212781566659154939419866797488347448551719481632572231632463575591599696388223344219228325134233238538854289437756331848887242423387542214691157226725179683638967415678697625138177633444765126223885478348951332634398291612134852858683942466178329922655822225426534359191696177633167962839847985826676955417426617126288255366123169174674348417932158291334646767637764323226842771523598562429399935789788215958367362467652444854123951972118358417629679454978687337137675495295768451719631999398617828287671937584998697959425845883145736323818225129311845997214987663433375689621746665629187252511643969315283316269222835744532431378945137649959158495714472963839397214332815241141327714672141875129895".split("");
// var total = 0;

// function processSum(input){
//   input.reduce(function(prev, next){
//     console.log(prev, next);
//     if(prev === next){
//       total += parseInt(prev);
//     }
//     return next;
//   });

//   if(input[0] === input[input.length - 1]){
//     total += parseInt(input[0]);
//   }
// }


// var inputPart2 = "5228833336355848549915459366737982598312959583817455621545976784792489468198365998232722734876612332352376192813552949814275947575774339529811976644361517795586998319242241614813622734255797569571577699238592667287428166398221572885869416419682687759743978434571821267146514338394624525648338739929479912368172669885577319718389278168766844487948761697438722556857882433224393723131298876252626643517236883999115665656935521675772866516185899317132494716723615493476397115627687887665194781746377341468995954554518252916859227397693885254329628812355612487594445522395853551734567498838382248616137969637971369615443599973588326388792893969924855316437952313492551671545714262784738343517166544197194547173515155927244175447296474282154114951181648317875827525814453758846194548872789943372281952995222779173812444186491115426476188672253249744478946863317915136832199132868917891243591195719354721129116229164688256853628339233919671468781913167415624214152793864585332944468428849171876873433621524242289488135675313544498245498637424139153782925723745249728743885493877792648576673196889949568317234125863369187953788611841388353999875519172896329524346527265231767868839696693328273381772726782949166112932954356923757485139367298699922984925977724972944277991686823219295939734313874834861796179591659174726432357533113896212781566659154939419866797488347448551719481632572231632463575591599696388223344219228325134233238538854289437756331848887242423387542214691157226725179683638967415678697625138177633444765126223885478348951332634398291612134852858683942466178329922655822225426534359191696177633167962839847985826676955417426617126288255366123169174674348417932158291334646767637764323226842771523598562429399935789788215958367362467652444854123951972118358417629679454978687337137675495295768451719631999398617828287671937584998697959425845883145736323818225129311845997214987663433375689621746665629187252511643969315283316269222835744532431378945137649959158495714472963839397214332815241141327714672141875129895";

// function processSum(input){
//   var length = input.length / 2;
//   var i = -1;
//   var sum = 0;
//   while(i++ <= length){
//     if(input[i] === input[i + length]){
//       sum += parseInt(input[i]);
//     }
//   }
//   console.log(sum * 2);
// }


// processSum(inputPart2);
// console.log(total);

// var double = x => x * 2;

// const what = [
//   1,2,3,[457, 456, 67],
//   [4,[223,45,67],2],
//   [1, 4, [56, 78, 90]]
// ];

// const recnestmap = (arr , fn) => {
//   return R.reduce((p, n) => {
//     if(Array.isArray(n)){
//       return R.append(recnestmap(n, fn), p);
//     }
//     return R.append(fn(n), p);
//   }, [], arr);
// }

// const recnestmap2 = (arr, fn) => {
//   return arr.map((a) => {
//     if(Array.isArray(a)){
//       return recnestmap2(a, fn);
//     } else {
//       return fn(a);
//     }
//   })
// }

// recnestmap2(what, double);

// //
// var array = [[0, 1], [2, 3], [4, 5, [6, 7, [8, [9, 10]]]]];
// console.log(flatten(array), array); // does not mutate array
// console.log(flatten(array, true), array); // array is now empty

// // This is done in a linear time O(n) without recursion
// // memory complexity is O(1) or O(n) if mutable param is set to false
// function flatten(array, mutable) {
//     var toString = Object.prototype.toString;
//     var arrayTypeStr = '[object Array]';

//     var result = [];
//     var nodes = (mutable && array) || array.slice();
//     var node;

//     if (!array.length) {
//         return result;
//     }

//     node = nodes.pop();

//     do {
//         if (toString.call(node) === arrayTypeStr) {
//             nodes.push.apply(nodes, node);
//         } else {
//             result.push(node);
//         }
//     } while (nodes.length && (node = nodes.pop()) !== undefined);

//     result.reverse(); // we reverse result to restore the original order
//     return result;
// }
// //


// var stack = [-3, 18, -6, -5, 30, -10];

// function sortStack(s) {
//   if (s.length > 0) {
//     var t = s.pop();
//     sortStack(s);
//     sortedInsert(s, t);
//   }
// }

// function sortedInsert(s, e) {
//   if (s.length === 0 || e > s[s.length - 1]) {
//     s.push(e);
//   } else {
//     var x = s.pop();
//     sortedInsert(s, e);
//     s.push(x);
//   }
// }

// sortStack(stack);

// console.log(stack);

// var permArr = [],
//   usedChars = [];

// function permute(input) {
//   var i, ch;
//   for (i = 0; i < input.length; i++) {
//     ch = input.splice(i, 1)[0];
//     usedChars.push(ch);
//     if (input.length == 0) {
//       permArr.push(usedChars.slice());
//     }
//     permute(input);
//     input.splice(i, 0, ch);
//     usedChars.pop();
//   }
//   return permArr
// };

// console.log(permute([1,2,3]));

// var swapItems = function(index, nextIndex, arr) {
//   var firstItem = arr[index];
//   var nextItem = arr[nextIndex];
//   arr[nextIndex] = firstItem;
//   arr[index] = nextItem;
//   return arr;
// };

// var permutationsOf = function(arr){
//   var arrLength = arr.length;
//   var perms = [];

//   var findPermutations = function(innerArr, index){
//    var last = innerArr;
//    var iterativeIndex = arr.length-1;
//    perms.push(innerArr);
//    while(iterativeIndex > 2){
//      last = swapItems(iterativeIndex, iterativeIndex-1, last.slice(0));
//      perms.push(last);
//      iterativeIndex--;
//    }

//    if(index > 1){
//      last = swapItems(iterativeIndex, iterativeIndex-1, last.slice(0))
//      findPermutations(last, index-1);
//    }

//    if(index === arr.length-1 && --arrLength > 0){
//      findPermutations(swapItems(1, 0, last.slice(0)), arr.length-1);
//    }

//    console.log(JSON.stringify(perms));
//   };
//   findPermutations(arr, arrLength - 1);
// };

// permutationsOf([1,2,3,4]);

// var test = "butwhy";

// function randomizeString(str){
//   var strArray = str.split('');
//   var start = strArray.length;
//   var randomSwapIndex = Math.floor(Math.random()*(start-1));
//   var currentChar = '';
//   while(--start) {
//     currentChar = strArray[start];
//     strArray[start] = strArray[randomSwapIndex];
//     strArray[randomSwapIndex] = currentChar;
//     randomSwapIndex = Math.floor(Math.random()*(start-1));
//   }
//   return strArray.join('');
// }

// console.log(randomizeString(test));

// //underscore parse url (array would be url split on "/")
// var arrs = _.object.apply(null, _.partition(["a", 2, "b", 3, "c", 4], function(){return arguments[1] % 2 === 0;}));


// function mergeSortRecursive (items) {
//   if (items.length == 1) {
//     return items;
//   }
//   var middle = Math.floor(items.length / 2),
//     left = items.slice(0, middle),
//     right = items.slice(middle);

//   return merge(mergeSortRecursive(left), mergeSortRecursive(right));
// }

// function merge(left, right){
//   var result = [];
//   while (left.length > 0 && right.length > 0){
//     if (left[0] < right[0]){
//       result.push(left.shift());
//     } else {
//       result.push(right.shift());
//     }
//   }
//   return result.concat(left).concat(right);
// }

// console.log(mergeSortRecursive([35,25,45,15,55,5]));

// function binarySearch(arr, num){
//   var upper = arr.length - 1;
//   var lower = 0;
//   var mid;

//   while(lower <= upper){
//     mid = Math.floor((upper+lower)/2);
//     if(num > arr[mid]){
//       lower = mid + 1;
//     } else if (num < arr[mid]) {
//       upper = mid - 1;
//     } else {
//       return mid;
//     }
//   }
//   return -1;
// }

// console.log(binarySearch([1,2,4,15,17,45,56,78], 78));
// function longestCommonSubstring(word1, word2){
//   var max = 0;
//   var index = 0;
//   var lcsarr = new Array(word1.length+1);

//   for(var i = 0; i <= word1.length+1; ++i){
//     lcsarr[i] = new Array(word2.length+1);
//     for(var j = 0; j <= word2.length+1; ++j){
//       lcsarr[i][j] = 0;
//     }
//   }

//   for(var i = 0; i <= word1.length; ++i){
//     for(var j = 0; j <= word2.length; ++j){
//       if (i === 0 || j === 0) {
//         lcsarr[i][j] = 0;
//       }

//       else {
//         if (word1[i-1] === word2[j-1]){
//           lcsarr[i][j] = lcsarr[i-1][j-1] + 1;
//         }
//         else {
//           lcsarr[i][j] = 0;
//         }
//       }
//       if (max < lcsarr[i][j]) {
//         max = lcsarr[i][j];
//         index = i;
//       }
//     }
//   }

//   var str = "";
//   if (max == 0) {
//     return "";
//   } else {
//     for (var i = index-max; i <= max; ++i){
//       str += word2[i];
//     }
//     return str;
//   }
// }

// longestCommonSubstring("abbcc", "dbbcc");

// function isPalindrome(str){
//     'use strict';

//     var strLength = str.length;
//     var start = 0;
//     var half = Math.floor(strLength/2);

//     while (strLength-- > half) {
//       if(str[strLength] !== str[start]){
//           return false;
//       }
//       start++;
//     }

//     return true;
// }

// function trampoline(fun){
//   return variadic(function(args){
//     var result = fun.apply(fun, args);
//     while(_.isFunction(result)){
//       result = result();
//     }
//     return result;
//   });
// }
// var __slice = Array.prototype.slice;

// function functionalize (fn) {
//   if (typeof fn === 'function') {
//     return fn;
//   } else if (typeof fn === 'string' && /^[_a-zA-Z]\w*$/.test(fn)) {
//     return function() {
//       var args, receiver, _ref;
//       receiver = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
//       return (_ref = receiver[fn]).call.apply(_ref, [receiver].concat(__slice.call(args)));
//     };
//   } else if (typeof fn === 'string') {
//     return to_function(fn);
//   } else if (typeof fn.lambda === 'function') {
//     return fn.lambda();
//   } else if (typeof fn.toFunction === 'function') {
//     return fn.toFunction();
//   }
// }

// var variadic = function () {
//   var FUNCTIONS = {};
//   function oldVariadic (fn) {
//     var fnLength = fn.length;

//     if (fnLength < 1) {
//       return fn;
//     }
//     else if (fnLength === 1)  {
//       return function () {
//         return fn.call(this, __slice.call(arguments, 0))
//       }
//     }
//     else {
//       return function () {
//         var numberOfArgs = arguments.length,
//             namedArgs = __slice.call(arguments, 0, fnLength - 1),
//             numberOfMissingNamedArgs = Math.max(fnLength - numberOfArgs - 1, 0),
//             argPadding = new Array(numberOfMissingNamedArgs),
//             variadicArgs = __slice.call(arguments, fn.length - 1);

//         return fn.apply(this, namedArgs.concat(argPadding).concat([variadicArgs]))
//       }
//     }
//   };
//   return function (arity, fn) {
//     if (fn == null) {
//       fn = functionalize(arity);
//       arity = 0;
//     }
//     else fn = functionalize(fn);
//     var fnLength = fn.length;
//     if (arity === 0) {
//       return oldVariadic(fn);
//     }
//     else if (fnLength <= arity) {
//       var fixedParams = fnLength - 1;
//       var index = '' + arity + '-' + fixedParams;
//       var code;

//       if (FUNCTIONS[index] == null) {
//         var parameters = new Array(arity);
//         for (var i = 0; i < arity; ++i) {
//           parameters[i] = "__" + i;
//         }
//         var pstr = parameters.join();
//         if (fnLength > 1) {
//           var cstr = parameters.slice(0, fnLength - 1).join();
//           code = "return function ("+pstr+") { return fn.call("+cstr+", [].slice.call(arguments,"+(fnLength - 1)+")); };";
//         }
//         else code = "return function ("+pstr+") { return fn.call(this, [].slice.call(arguments, 0)); };";
//         FUNCTIONS[index] = new Function(['fn'], code);
//       }
//       return FUNCTIONS[index](fn);
//     }
//     else throw 'not supported yet'
//   };
// }();

// function fibTramp(n){
//   var _fib = trampoline(function myself(acc, prev, i){
//    console.log(acc);
//    if (i === n)
//     return acc
//    else
//     return function(){return myself((acc + prev), acc, ++i)};
//   });

//   return _fib(1,1,1);
// }

// function factorial (n) {
//   var _factorial = trampoline(function myself (acc, n) {
//     return n
//     ? function(){ return myself(acc * n, n - 1); }
//     : acc
//   });
//   return _factorial(1, n);
// }

// function Y(f){
//   var g = f(function(){
//     return g.apply(this, arguments);
//   });
//   return g;
// }

// var Yfib = Y(function(f){
//   var cache = {};
//   return function(n){
//     if(n<2)
//       return 1;

//     if (!cache[n])
//       cache[n] = f(n-1) + f(n-2);

//     return cache[n];
//   };
// });

// function qSort(arr)
// {
//     if (arr.length === 0) {
//         return [];
//     }
//     var left = [];
//     var right = [];
//     var pivot = arr[0];
//     for (var i = 1; i < arr.length; i++) {
//       if (arr[i] < pivot) {
//          left.push(arr[i]);
//       } else {
//          right.push(arr[i]);
//       }
//     }
//     return qSort(left).concat(pivot, qSort(right));
// }
// var a = [];
// for (var i = 0; i < 10; ++i) {
//    a[i] = Math.floor((Math.random()*100)+1);
// }

// function insertionSort(array) {
//   var temp, inner;
//   for (var outer = 1; outer <= array.length-1; ++outer) {
//     temp = array[outer];
//     inner = outer;
//     while (inner > 0 && (array[inner-1] >= temp)) {
//        array[inner] = array[inner-1];
//        --inner;
//     }
//     array[inner] = temp;
//   }
//   return array;
// }

//Copyright 2009 Nicholas C. Zakas. All rights reserved.
//MIT-Licensed, see source file
// function binarySearch(items, value){

//     var startIndex  = 0,
//         stopIndex   = items.length - 1,
//         middle      = Math.floor((stopIndex + startIndex)/2);

//     while(items[middle] != value && startIndex < stopIndex){

//         //adjust search area
//         if (value < items[middle]){
//             stopIndex = middle - 1;
//         } else if (value > items[middle]){
//             startIndex = middle + 1;
//         }

//         //recalculate middle
//         middle = Math.floor((stopIndex + startIndex)/2);
//     }

//     //make sure it's the right value
//     return (items[middle] != value) ? -1 : middle;
// }

// binarySearch([1,2,3,4,5,6,7,8,9,10,11], 2);

// function existy(x) { return x != null; }

// Object.prototype.deepMerge = function (obj){
//   if (!existy(obj) || !_.isObject(obj))
//       return obj;

//   for(var key in obj){
//     if (obj.hasOwnProperty(key)){
//       this[key] = this.deepMerge.call(this[key], obj[key]);
//     }
//   }
//   return this;
// };


// var myObj = {
//   prop1: 1,
//   prop2: [1,2,3],
//   prop3: {
//    prop3A:{
//      prop3A1:"sfdf",
//      prop3A2:{
//          prop:"wow"
//        }
//      },
//      prop3B: "sdfsf"
//   },
//   prop4:{
//     prop4A:'test'
//   }
// };

// var myObj2 = {
//   prop1:2,
//   prop3: {
//    prop3A:{
//      prop3A1:"sfdf",
//      prop3A2:{
//          prop:"wow2",
//          propwow: 'wow3'
//        }
//      },
//      prop3B: "second",
//      prop3C: 'C'
//   },
//   prop4:{
//     prop4A:'hey4A',
//     prop4B:'B'
//   }
// };
// myObj.deepMerge(myObj2)
// console.log(myObj);

// var fibonacci = (function() {
//   var memo = {};

//   function f(n) {
//     var value;

//     if (n in memo) {
//       value = memo[n];
//     } else {
//       if (n < 2)
//         value = n;
//       else
//         value = f(n - 1) + f(n - 2);

//       memo[n] = value;
//     }

//     return value;
//   }

//   return f;
// })();

// var fibonacci = (function() {
//   var memo = {};
//   var slice = Array.prototype.slice;

//   function f(x, n) {
//     var args = slice.call(arguments);
//     var value;

//     if (args in memo) {
//       value = memo[args];
//     } else {
//       if (n === 0 || n === 1)
//         value = n;
//       else
//         value = f(x, n - 1) + f(x, n - 2);

//       memo[arguments] = value;
//     }

//     return value;
//   }

//   return f;
// })();

  //console.log(fibonacci(6));



// function binarySearch(array, key) {
//     var lo = 0,
//         hi = array.length - 1,
//         mid,
//         element;
//     while (lo <= hi) {
//         mid = Math.floor((lo + hi) / 2, 10);
//         element = array[mid];
//         if (element < key) {
//             lo = mid + 1;
//         } else if (element > key) {
//             hi = mid - 1;
//         } else {
//             return mid;
//         }
//     }
//     return -1;
// }

//binarySearch([1,2,3,4,5,6,7,8,9,10], 3);


// Array.prototype.binarySearch = function(find, comparator) {
//   var low = 0;
//   var high = this.length - 1;
//   var mid;
//   var comparison;

//   while (low <= high) {
//     mid = Math.floor((low + high) / 2);
//     comparison = comparator(this[mid], find);
//     if (comparison < 0) { low = mid + 1; continue; }
//     if (comparison > 0) { high = mid - 1; continue; }
//     return mid;
//   }
//   return null;
// };

// [1,2,3,4,5,6,7,8,9,10].binarySearch(2, function(a, b){return a - b;});