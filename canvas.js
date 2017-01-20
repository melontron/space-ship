/**
 * Created by melontron on 1/20/17.
 */


var stars = [
    {
        mass: 100,
        x:50,
        y:50,
        L: 100,
        r: 17,
        image: "./images/sun.png"
    },
    {
        mass: 100,
        x: 200,
        y:40,
        L: 100,
        r: 19,
        image: "./images/sun.png"
    },
    {
        mass: 100,
        x: 150,
        y:160,
        L: 100,
        r: 30,
        image: "./images/sun.png"
    },
    {
        mass: 100,
        x: 400,
        y:270,
        L: 100,
        r: 30,
        image: "./images/sun.png"
    }
];

var ship = {
    mass: 30,
    x:10,
    y: 50,
    vx: 10,
    vy: 0,
    image: ""
}

var Controller = function (canvasId, stars, ship) {
    var _this = this;
    this.screen = {
        w: 480,
        h: 320
    };
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.screen.w;
    this.canvas.height = this.screen.h;
    this.context = this.canvas.getContext('2d');

    this.timeStep = 20;


    this.init = function () {
        _this.stars = [];
        stars.map(function (star) {
            var sImage = new Image();
                sImage.src = star.image;
                star.image = sImage;
                _this.stars.push(star);
        });
        _this.ship = ship;

        _this.canvas.addEventListener("click", _this.clickHandler);
        _this.render();
        _this.update();
    };

    this.requestState = function (ship, stars) {
        return god(ship, stars);
    };

    this.render = function () {
        _this.clear();

        this.context.beginPath();
        this.context.fillStyle = "FF0000";
        this.context.rect(0,0,this.canvas.width, this.canvas.height);
        this.context.stroke();

        this.context.beginPath();
        this.context.fillStyle = "00FF00";
        this.context.fillRect(_this.ship.x,_this.ship.y,20, 20);

        this.stars.map(function (star) {
            _this.context.beginPath();
            _this.context.drawImage(star.image, star.x - star.r, star.y - star.r, 2* star.r, 2*star.r);
            _this.context.stroke();
        });


    };

    this.clear = function () {
        _this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    };

    this.updateState = function (coords) {
        _this.ship.x = coords.ship.x;
        _this.ship.y = coords.ship.y;
        _this.ship.vx = coords.ship.vx;
        _this.ship.vy = coords.ship.vy;
    };
    this.update = function () {
        this.interval = setInterval(function () {
            var coords = _this.requestState(_this.ship, _this.stars);
            //var coords = {};
            // coords.ship = {
            //     x: _this.ship.x + Math.random()*10,
            //     y: _this.ship.y + Math.random()*30 - Math.random()*20
            // };

            _this.updateState(coords);
            _this.render();
        }, this.timeStep)
    };


    this.clickHandler = function (event) {
        var cx = event.clientX - _this.canvas.getBoundingClientRect().left;
        var cy = event.clientY- _this.canvas.getBoundingClientRect().top;
        var star = _this.findClickedStar(cx, cy);
        console.log(star);

    };
    //run

    this.getDist = function (x1,y1,x2,y2) {
        return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2 , 2) );
    };

    this.findClickedStar = function (x,y) {
        var res = -1;
        _this.stars.map(function (star) {
            var dist = _this.getDist(x,y,star.x, star.y);
            if( dist <= star.r ){
                res = star;
            }
        });

        return res;
    };
    this.init();
};


