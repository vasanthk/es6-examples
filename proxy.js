/**
 *  Proxies
 *  Proxies enable you to intercept and customize operations performed on objects (such as getting properties).
 *  They are a meta programming feature.
 *
 *  @Reference: http://www.2ality.com/2014/12/es6-proxies.html
 */

(function () {
  let NegativeIndices = (array) => {
    return new Proxy(array, {
      get: (receiver, name) => {
        let index;
        console.log('Proxy#get', array, name);
        index = parseInt(name);
        if (!isNaN(index) && index < 0) {
          array[array.length + index];
        } else {
          return array[name];
        }
      }
    });
  };

  /*
   * Negitve array indices:
   * array = NegativeIndices [4, 420, 42]
   * array[-1] is 42
   */
})();