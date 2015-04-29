/**
 * Support for computed names in object property definitions.
 */

// ES5
var obj = {
    foo: "bar"
};
obj["prop_" + foo()] = 42;

// ES6
var obj = {
    foo: "bar",
    [ "prop_" + foo() ]: 42
};

// Dummy fn
function foo() {
    return 'name';
}