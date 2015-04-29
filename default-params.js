/**
 * Default parameter values allow you to initialize parameters if they were not explicitly supplied.
 * This means that you no longer have to do options = options || {};
 */

// ES5
function testFunc(x, y, z) {
    if (y === undefined)
        y = 7;
    if (z === undefined)
        z = 42;
    return x + y + z;
}
console.log(testFunc(1));

// ES6
function testFunc(x, y = 7, z = 42) {
    return x + y + z;
}
console.log(testFunc(1));
