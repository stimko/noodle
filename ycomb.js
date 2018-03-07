function Y(f) {
  var g = f(function() {
      return g.apply(this, arguments);
  });
  return g;
}
 
var fac = Y(function(f) {
  return function(n) {
      return n > 1 ? n * f(n - 1) : 1;
  };
});

console.log(fac(3));