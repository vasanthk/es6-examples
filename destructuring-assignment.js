/**
 * Destructuring Assignment
 *
 * Destructuring allows binding using pattern matching, with support for matching arrays and objects.
 * Destructuring is fail-soft, similar to standard object lookup foo["bar"], producing undefined values when not found.
 */

// Destructuring Assignment ES6
var [x, y, z] = [1, 2, 3];
// is equivalent to..
var x = 1, y = 2, z = 3;
// it even works with nested arrays
let [x, [y]] = [1, [2]];
console.log(x, y); // 2, 1

// Array Matching
// ES5
var list = [1, 2, 3];
var a = list[0],
    b = list[2];
var tmp = a;
a = b;
b = tmp;

// ES6
var list = [1, 2, 3];
var [ a, , b ] = list;
[b, a] = [a, b];    // Swapping values of variables.


// Object Matching, Shorthand Notation
// ES5
var tmp = getASTNode();
var op = tmp.op;
var lhs = tmp.lhs;
var rhs = tmp.rhs;

// ES6
var { op, lhs, rhs } = getASTNode();

// Object Matching, Deep Matching
// ES5
var tmp = getASTNode();
var a = tmp.op;
var b = tmp.lhs.op;
var c = tmp.rhs;

// ES6
var { op: a, lhs: { op: b }, rhs: c } = getASTNode();

// Fail-Soft Destructuring
// ES5
var list = [7, 42];
var a = typeof list[0] !== "undefined" ? list[0] : 1;
var b = typeof list[1] !== "undefined" ? list[1] : 2;
var c = typeof list[2] !== "undefined" ? list[2] : 3;
var d = typeof list[3] !== "undefined" ? list[3] : undefined;
a === 7;
b === 42;
c === 3;
d === undefined;

// ES6
var list = [7, 42];
var [ a = 1, b = 2, c = 3, d ] = list;  // Default value specified for a, b
a === 7;
b === 42;
c === 3;
d === undefined;