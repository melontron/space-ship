/**
 * Created by melontron on 1/20/17.
 */

var SpaceObject = function (mass, coordinates, velocity, acceleration) {
    this.mass = mass;
    this.velocity = velocity;
    this.coordinates = coordinates;
    this.acceleration = acceleration;
};

var Star = function (mass, coordinates, velocity, acceleration, brightness) {
    this.prototype = new SpaceObject(mass, coordinates, velocity, acceleration);
    this.brightness = brightness;
};

var Ship = function (mass, coordinates, velocity, acceleration) {
    this.prototype = new SpaceObject(mass, coordinates, velocity, acceleration);
}

var stars = [
    {mass: 100, coordinates:{x:50,y:50},velocity: 0,acceleration: 0,brightness: 100},
    {mass: 100, coordinates:{x: 100,y:100},velocity: 0,acceleration: 0,brightness: 100}
];

var ship = {
    mass: 30,
    coordinates:{
        x:10,
        y: 50
    },
    velocity: 10,
    acceleration: 0
}

var Environment = function () {
    this.G = 1;
    this.stars = [];
    this.timeStep = 20;
    var _this = this;
    this.initialize = function () {
        stars.map(function (star) {
            _this.stars.push(new Star(star.mass,star.coordinates,star.velocity, star.acceleration, star.brightness));
        });
        _this.ship = new Ship(ship.mass, ship.coordinates,ship.velocity, ship.acceleration);
    };

    this.update = function () {
        
    }
}



var env = new Environment();
env.initialize();