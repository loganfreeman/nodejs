
var runAsync = module.exports = function (func, cb) {
  cb = cb || function () {};

  return function () {
    var async = false;
    var args = arguments;

    var promise = new Promise(function (resolve, reject) {
      var answer = func.apply({
        async: function () {
          async = true;
          return function (err, value) {
            if (err) {
              reject(err);
            } else {
              resolve(value);
            }
          };
        }
      }, Array.prototype.slice.call(args));

      if (!async) {
        if (isPromise(answer)) {
          answer.then(resolve, reject);
        } else {
          resolve(answer);
        }
      }
    });

    promise.then(cb.bind(null, null), cb);

    return promise;
  }
};
