var stackBase = {
  array: [],
  index: -1,
  push: function (value) {
    return this.array[this.index += 1] = value;
  },
  pop: function () {
    var value = this.array[this.index];
    this.array[this.index] = void 0;
    if (this.index >= 0) {
      this.index -= 1;
    }
    return value;
  },
  isEmpty: function () {
    return this.index < 0;
  }
};

var stackProxy = {
  push: function (value) {
    return stackBase.push(value);
  },
  pop: function () {
    return stackBase.pop();
  },
  isEmpty: function () {
    return stackBase.isEmpty();
  }
};


function proxy (baseObject) {
  var proxyObject = Object.create(null),
      methodName;
  for (methodName in baseObject) {
    if (typeof(baseObject[methodName]) ===  'function') {
      (function (methodName) {
        proxyObject[methodName] = function () {
          var result = baseObject[methodName].apply(baseObject, arguments);
          return (result === baseObject)
                 ? proxyObject
                 : result;
        }
      })(methodName);
    }
  }
  return proxyObject;
}

var stack = proxy(stackBase);
stack.push('auto');
