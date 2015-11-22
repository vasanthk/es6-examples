/**
 * Iterables and Iterators
 *
 * A value is considered iterable if it has a method whose key is the symbol Symbol.iterator that returns a so-called iterator.
 * The iterator is an object that returns values via its method next(). We say: it enumerates items, one per method call.
 * Data consumers use the iterator to retrieve the values they are consuming.
 *
 * Iterable and iterators are part of a so-called protocol (methods plus rules for using them) for iteration.
 * A key characteristic of this protocol is that it is sequential: the iterator returns values one at a time.
 * That means that if an iterable data structure is non-linear (such as a tree), iteration will linearize it.
 *
 * Iterables:
 * An Iterable is a simple representation of a series of elements that can be iterated over.
 * It does not have any iteration state such as a "current element"/"next". Instead, it has one method that produces an Iterator.
 * Any object that contains a [Symbol.iterator] method is an iterable object. In case you are unfamiliar with symbols, they are objects that can be used as property keys.
 *
 * Iterators:
 * Iterator objects must have a next method that returns a result object in the { value: Any, done: Boolean } format.
 * The first call to the next method returns the result of the first iteration (e.g. the item at 0th index in an array).
 * The done property signals when the iterator has been exhausted and no more values are available.
 *
 * String, Array, TypedArray, Map and Set are all built-in iterables, because the prototype objects of them all have a Symbol.iterator method.
 *
 * @Reference:
 * http://jsrocks.org/2015/09/javascript-iterables-and-iterators/
 * http://www.2ality.com/2015/02/es6-iteration.html
 * https://strongloop.com/strongblog/introduction-to-es6-iterators/
 */

// Basic Iterator
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());
// { value: 'a', done: false }
console.log(iter.next());
// { value: 'b', done: false }
console.log(iter.next());
// { value: 'c', done: false }
console.log(iter.next());
// { value: undefined, done: true }


// ADVANCED LEARNING: Implementing dummy iterable
let iterable = {
  [Symbol.iterator]() {
    let step = 0;
    let iterator = {
      next() {
        if (step <= 2) {
          step++;
        }
        switch (step) {
          case 1:
            return {value: 'hello', done: false};
          case 2:
            return {value: 'world', done: false};
          default:
            return {value: undefined, done: true};
        }
      }
    };
    return iterator;
  }
};

for (let x of iterable) {
  console.log(x);
}
// Output:
// hello
// world


// ADVANCED LEARNING: Iterators that are iterable
function iterateOver(...args) {
  let index = 0;
  let iterable = {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < args.length) {
        return { value: args[index++] };
      } else {
        return { done: true };
      }
    }
  };
  return iterable;
}

let arr = [];
let iterator = arr[Symbol.iterator]();
iterator[Symbol.iterator]() === iterator // true

/**
 * Why is it useful if an iterator is also an iterable? for-of only works for iterables, not for iterators.
 * Because array iterators are iterable, you can continue an iteration in another loop:
 */
let arr = ['a', 'b'];
let iterator = arr[Symbol.iterator]();

for (let x of iterator) {
  console.log(x); // a
  break;
}

// Continue with same iterator:
for (let x of iterator) {
  console.log(x); // b
}


