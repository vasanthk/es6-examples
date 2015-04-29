/**
 * Classes
 * ES6 classes are syntactical sugar over the Objects and prototypes that we're used to working with.
 * They simply offer a much nicer, cleaner and clearer syntax for creating these objects and dealing with inheritance.
 *
 */

// In ES5
function Car(make) { //approximate a class/constructor
    this.make = make;
    this.currentSpeed = 25;

    this.printCurrentSpeed = function () { //expose a function
        console.log(this.make + ' is going ' + this.currentSpeed + ' mph.');
    };
}

// Instantiate a new car
var moderatelyPricedCar = new Car("Kia");
moderatelyPricedCar.printCurrentSpeed(); //Kia is going 25 mph.


// In ES6
class Car {
    constructor(make) { //constructors!
        this.make = make;
        this.currentSpeed = 25;
    }

    printCurrentSpeed() {
        console.log(this.make + ' is going ' + this.currentSpeed + ' mph.');
    }
}

class RaceCar extends Car { //inheritance
    constructor(make, topSpeed) {
        super(make); //call the parent constructor with super
        this.topSpeed = topSpeed;
    }

    goFast() {
        this.currentSpeed = this.topSpeed;
    }
}

let stang = new RaceCar('Mustang', 150);

stang.printCurrentSpeed();
stang.goFast();
stang.printCurrentSpeed();