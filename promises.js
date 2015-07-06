/**
 * Promises
 *
 * Promises are a library for asynchronous programming.
 * It is a first class representation of a value that may be made available in the future.
 *
 */

(function () {
  function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration);
    })
  }

  var p = timeout(1000).then(() => {
    return timeout(2000);
  }).then(() => {
    throw new Error('Random error');
  }).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
  });

})();