export function promisify(fn: Function, firstData?: boolean): () => Promise<any> {
  return function(...args): Promise<any> {
    return new Promise(function(resolve, reject) {
      args.push(function(err, ...result) {
        let res = result;

        if (result.length <= 1) {
          res = result[0];
        }

        if (firstData) {
          res = err;
          err = null;
        }

        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

      fn.apply(null, args);
    });
  };
}
