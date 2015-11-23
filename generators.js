/**
 * Generators
 *
 * @Reference:
 * http://www.2ality.com/2015/03/es6-generators.html
 * https://davidwalsh.name/async-generators
 * https://www.youtube.com/watch?v=QO07THdLWQo
 * https://www.youtube.com/watch?v=3UKsXCMK6Iw
 */

/**
 * What are generators?
 * Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.
 */

//  Two things distinguish genFunc from a normal function declaration:
//    It starts with the “keyword” function*.
//    It is paused in the middle via yield.
function* genFunc() {
  console.log('First');
  yield;                  // (A)
  console.log('Second');  // (B)
}
//  Calling genFunc does not execute it. Instead, it returns a so-called generator object that lets us control genFunc’s execution:
let genObj = genFunc();

// genFunc() is initially suspended at the beginning of its body. The method genObj.next() continues the execution of genFunc, until the next yield:
genObj.next();
// OUTPUT:
// First
// { value: undefined, done: false }

// genFunc is now paused in line (A). If we call next() again, execution resumes and line (B) is executed
genObj.next();
// OUTPUT:
// Second
// { value: undefined, done: true }


/**
 * Implementing iterables via generators
 */
// The asterisk after `function` means that`objectEntries` is a generator
function* objectEntries(obj) {
  // Reflect is a built-in object that provides methods for interceptable JavaScript operations.
  // Reflect.ownKeys returns an array of the target object's own (not inherited) property keys.
  // https://twitter.com/nilssolanki/status/659839340592422912
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    // `yield` returns a value and then pauses the generator. Later, the execution continues where it was previously paused.
    yield[propKey, obj[propKey]];
  }

}
// Usage
let jane = {first: 'Jane', last: 'Doe'};
for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// Output:
// first: Jane
// last: Doe