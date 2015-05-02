/**
 * Modules
 * The ES6 module standard has two parts:
 * - Declarative syntax (for importing and exporting).
 * - Programmatic loader API: to configure how modules are loaded and to conditionally load modules.
 *
 * Ref: http://www.2ality.com/2014/09/es6-modules-final.html
 */

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