/**
 * Promises
 *
 * Promises are a pattern that helps with functions (or methods) that return their results asynchronously.
 * To implement such a function, you return a promise, an object that is a placeholder for the result.
 * The caller of the function registers callbacks with the promise to be notified once the result has been computed.
 * The function sends the result via the promise.
 *
 * States:
 * A promise is always in either one of three mutually exclusive states:
 * - Before the result is ready, the promise is pending.
 * - If a result is available, the promise is fulfilled.
 * - If an error happened, the promise is rejected.
 *
 * A promise is settled if “things are done” (if it is either fulfilled or rejected).
 * A promise is settled exactly once and then remains unchanged.
 *
 * Reacting to state changes:
 * - Promise reactions are callbacks that you register with the promise method then(), to be notified of a fulfillment or a rejection.
 * - A thenable is an object that has a promise-style then() method. Whenever the API is only interested in being notified of settlements, it only demands thenables.
 *
 * Changing states:
 * There are two operations for changing the state of a promise. After you have invoked either one of them once, further invocations have no effect.
 * - Rejecting a promise means that the promise becomes rejected.
 * - Resolving a promise has different effects, depending on what value you are resolving with:
 *    - Resolving with a normal (non-thenable) value fulfills the promise.
 *    - Resolving a promise P with a thenable T means that P can’t be resolved anymore and will now follow T’s state, including its fulfillment or rejection value.
 *      The appropriate P reactions will get called once T settles (or are called if T is already settled).
 *
 *  @Reference:
 *  http://www.2ality.com/2014/10/es6-promises-api.html
 *  http://www.mattgreer.org/articles/promises-in-wicked-detail/
 *
 */

(function () {
  // Async with then()
  readFilePromisified('config.json')
    .then(function (text) {
      var obj = JSON.parse(text);
      console.log(JSON.stringify(obj, null, 4));
    })
    .catch(function (reason) {
      console.error('An error occurred', reason);
    });


  // Promise example
  var promise = new Promise(
    function (resolve, reject) {
      if (status) {
        resolve(value);
      } else {
        reject(reason);
      }
    }
  );

  promise.then(
    function (value) {
      // fulfillment
    },
    function (reason) {

    }
  );

  //Perform HTTP get using promise
  function httpGet(url) {
    return new Promise(
      function (resolve, reject) {
        var request = new XMLHttprequest();
        request.onreadystatchange = function () {
          if (this.status === 200) {
            // Success
            resolve(this.response);
          } else {
            // Something went wrong (404 etc.)
            reject(new Error(this.statusText));
          }
        };

        request.onerror = function () {
          reject(new Error(
            'XMLHttpRequest Error: ' + this.statusText));
        };
        request.open('GET', url);
        request.send();
      }
    );
  }

  // Promise: setTimeout() example.
  function delay(ms) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, ms);
    });
  }

  delay(5000).then(function () {
    console.log('5 seconds have passed');
  });

  // Timing out a promise
  function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
      promise.then(resolve);
      setTimeout(function () {
        reject(new Error('Timeout after ' + ms + ' ms'));
      }, ms);
    });
  }

  // Async - then()
  asyncFunc1()
    .then(function (value1) {
      asyncFunc2()
        .then(function (value2) {
          // ...
        });
    });

  // Flat version
  asyncFunc1()
    .then(function (value1) {
      return asyncFunc2();
    })
    .then(function (value2) {
      // ...
    });

  // Whatever you return in an error handler becomes a fulfillment value (not rejection value)
  // hence, this allows you to specify default values that are used in case of failure.
  retrieveFileName()
    .catch(function () {
      return 'Untitled.txt';
    })
    .then(function (fileName) {
      // ...
    });

  // Exceptions in the executor are passed on to the next error handler.
  new Promise(function (resolve, reject) {
    throw new Error();
  })
    .catch(function (err) {
      // handle error
    });

  // There can be one or more then() method calls that don’t provide an error handler.
  // Then the error is passed on until there is an error handler.
  asyncFunc1()
    .then(asyncFunc2)
    .then(asyncFunc3)
    .catch(function (reason) {
      // Something went wrong above
    });

  // Promise.all()
  var fileUrls = [
    'http://example.com/file1.txt',
    'http://example.com/file2.txt'
  ];
  var promisedTexts = fileUrls.map(httpGet);

  // Promise.all() takes an array of promises (thenables and other values are converted to promises via Promise.resolve())
  // and, once all of them are fulfilled, it fulfills with an array of their values
  // Promise.all(iterable): returns a promise that:
  //  - is fulfilled if all elements in iterable are fulfilled.
  //  - Fulfillment value: array with fulfillment values.
  //
  //  - is rejected if any of the elements are rejected.
  //  - Rejection value: first rejection value.

  Promise.all(promisedTexts)
    .then(function (texts) {
      texts.forEach(function (text) {
        console.log(text);
      });
    })
    .catch(function (reason) {
      // Receives first rejection among the promises
    });

  // Promise.race() takes an array of promises (thenables and other values are converted to promises via Promise.resolve()) and returns a promise P.
  // Promise.race(iterable): the first element of iterable that is settled is used to settle the returned promise.
  // This example implements a timeout.
  Promise.race([
    httpGet('http://example.com/file.txt'),
    delay(5000).then(function () {
      throw new Error('Timed out')
    })
  ])
    .then(function (text) {
      //...
    })
    .catch(function (reason) {
      // ...
    });

})();