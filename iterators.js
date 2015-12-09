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
 * The iterator completion value (when done: true) is usually ignored by iterable consumers.
 * Several built-ins that you usually feed arrays to actually accept any iterable object (for-of, Array.from, yield*, [a, b, ...rest] = iterable);
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
        return {value: args[index++]};
      } else {
        return {done: true};
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

/**
 * Built-in iterables
 * for-of loop takes advantage of the iterable pattern.
 *
 * @Reference: http://ruben-cordeiro.com/es6-overview-iterators/
 */

// Array
let arr = [1, 2, 3, 4];
for (let value of arr) {
  console.log(value);
}

// String
let blogPostName = 'ES6 overview: Iterables';
for (let character of blogPostName) {
  console.log(character);
}

// Set
let words = ['Call', 'me', 'maybe', 'maybe'];
let uniqueWords = new Set(words);
for (let word of uniqueWords) {
  console.log(word);
}

// Map
let kvArray = [['Sachin', 1], ['ABD', 2]];
let rankings = new Map(kvArray);
for (let [player, rank] of rankings) {
  console.log(player, ': ', rank);
}

/**
 * Other language constructs that take advantage of iterables
 */

// Destructuring assignment
let arr = ["One", "Two", "Three", "Four"];

// without destructuring
let one = arr[0];
let two = arr[1];
let three = arr[2];

// with destructuring
let [one, two, three] = arr;

// This syntax is also valid for iterables other than arrays:
let names = new Set(["Ruben", "Duarte", "Hugo", "Henrique"]);
let [first, ...rest] = names;
// first = "Ruben"; rest = ["Duarte", "Hugo", "Henrique"];


// Spread
// The spread operator inserts the values of an iterable into an array:
let arr = [1, 2, 3];
let composedArray = [1, 2, ...arr, 4];
console.log(composedArray); // [1, 2, 1, 2, 3, 4]

// One of the main use case for this operator is the conversion of any iterable to an array in a compact fashion:
let iterable = new Set().add("Ruben").add("Henrique").add("Duarte");
let arr = [...iterable];


/**
 * Implementing Fibonacci using iterables
 */

let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next () {
        [ pre, cur ] = [cur, pre + cur];
        return {done: false, value: cur};
      }
    };
  }
};

for (let n of fibonacci) { // internally, next() is called for each iteration
  if (n > 1000)
    break;
  console.log(n);
}