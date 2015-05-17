/** Objext Literal
 * While every object property needs to be either a key-value pair or getter/setter, this may change in the near future.
 * Another syntactic sugar in the upcoming ECMAScript 6 is the object literal property value shorthand.
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