/**
 * Modules
 * The ES6 module standard has two parts:
 * - Declarative syntax (for importing and exporting).
 * - Programmatic loader API: to configure how modules are loaded and to conditionally load modules.
 *
 * Ref: http://www.2ality.com/2014/09/es6-modules-final.html
 */

// 1. NAMED EXPORTS

// ES6
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

// If you want to, you can also import the whole module and refer to its named exports via property notation:

//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5


// ES5 (CommonJS style)
//------ lib.js ------
var sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
module.exports = {
    sqrt: sqrt,
    square: square,
    diag: diag
};

//------ main.js ------
var square = require('lib').square;
var diag = require('lib').diag;
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5



// user.js

// By default anything you declare in a file in a ES6 project is not available outside that file.
// You have to use the export keyword to explicitly make it available. Here’s an example of how to export a user class.

var localVariable = 123;    // Not visible outside this file
export default function User(age) {
    this.age = age;
} // Can be imported by other files.


// user-details.js

// And now if we wanted to use the User class in another file

import User from 'user';
var testUser = new User(35);