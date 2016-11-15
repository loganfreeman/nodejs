var deprecate = function (message, fn) {
  return function () {
    deprecate.log(message);
    return fn.apply(this, arguments);
  };
};
