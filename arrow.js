/**
 * Arrow functions (or) Fat arrows
 *
 * The goal of Arrow Functions is to address and resolve several common pain points of traditional Function Expression:
 * - Lexical 'this' binding
 * - Shorter syntactical form (() => {} vs. function () {})
 *
 * Ref: http://jsrocks.org/2014/10/arrow-functions-and-their-scope/
 */

// How it works?

// this function
var func = function (param) {
    return param.split(" ");
};

// would become:
var func = param => param.split(" ");

// Examples
var users = [
    {name: 'Jack', age: 21},
    {name: 'Ben', age: 23},
    {name: 'Adam', age: 22}
];

// ES5
console.log(users.map(user => user.age));   // [21, 23, 22]

// ES6
var ages = users.map(user => user.age);
console.log(ages);  // [21, 23, 22]

// Because reduce takes two parameters, brackets are required
// to make it clear that the parameters are for the arrow function, not for the reduce call.
var sum = ages.reduce((a, b) => a + b);
console.log(sum);   // 66

// IIFE
(x => x * 2)(3); // 6

// Scope
// In ES5
document.body.addEventListener('click', function (evt) {
    console.log(evt, this); // EventObject, BodyElement
});

// In ES6
document.body.addEventListener('click', evt=>console.log(evt, this)); // EventObject, BodyElement
