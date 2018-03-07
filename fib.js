function fib(n){
  var prev = 0;
  var base = 1;
  var result = 0;

  while(n--){
    result = base + prev; //1 2 3 5
    prev = base; //1 1 2 3
    base = result; //1 2 3 5
  }
  return result;
}

function fibRecur(n){
  if(n<2){
    return n;
  } else {
    return fibRecur(n-1) + fibRecur(n-2);
  }
}

function Y(f){
  var g = f(function(){
      return g.apply(this, arguments);
  });
  return g;
}

var Yfib = Y(function(f){
  var cache = {};
  return function(n){
    if(n<2)
      return n;

    if (!cache[n])
      cache[n] = f(n-1) + f(n-2);

    return cache[n];
  };
});
