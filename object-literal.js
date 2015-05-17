/** Objext Literal
 * While every object property needs to be either a key-value pair or getter/setter, this may change in the near future.
 * Another syntactic sugar in the upcoming ECMAScript 6 is the object literal property value shorthand.
 * Ref: http://codepen.io/bradleyboy/posts/getting-to-know-es6-object-literals
 */

// ES5
function createVillain(name, power) {
    return {type: 'Darth Vader', name: name, power: power};
}
function createHero(name) {
    return {type: 'Luke', name: name};
}

// ES6
function createVillain(name, power) {
    return {type: 'Darth Vader', name, power};
}
function createHero(name) {
    return {type: 'Luke', name};
}

// ES5
var x = 10;
var y = 30;
var coordinates = {
    x: x,
    y: y
};
console.log(coordinates); // { x: 10, y: 30 }

// ES6
let x = 10;
let y = 30;
let coordinates = {x, y};
console.log(coordinates); // { x: 10, y: 30 }

// ES6
let x = 10;
let y = 30;
let coordinates = {
    x,
    y,
    z: 10
};
console.log(coordinates); // { x: 10, y: 30, z: 10 }