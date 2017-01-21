/**
 * Created by melontron on 1/20/17.
 */


var stars = [
    {
        M: 6.25*4,
        x:60,
        y:700,
        L: 0,
        r: 35,
        image: "./images/sun.png"
    },
     {
         M: 8*4,
         x: 500,
         y:100,
         L: 0,
         r: 19,
         image: "./images/sun.png"
     },
     {
         M: 6.25*4,
         x: 1000,
         y:200,
         L: 0,
         r: 50,
         image: "./images/sun.png"
     }

];

var ship = {
    x: 60,
    y: 650,
    vx:  100,
    vy: 0,
    image: ""
}

var Controller = function (canvasId, stars, ship) {
    var _this = this;
    this.screen = {
        w: 1200,
        h: 900
    };
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.screen.w;
    this.canvas.height = this.screen.h;
    this.context = this.canvas.getContext('2d');

    this.timeStep = 10;
    this.clicked = false;
    this.evt = 0;
    this.changing = null;


    this.init = function () {
        _this.stars = [];
        stars.map(function (star) {
            var sImage = new Image();
                sImage.src = star.image;
                star.image = sImage;
                _this.stars.push(star);
        });
        _this.ship = ship;

        // _this.canvas.addEventListener("click", _this.clickHandler);
        _this.canvas.addEventListener("mousedown", _this.mousedown);
        _this.canvas.addEventListener("mouseup", _this.mouseup);
        _this.canvas.addEventListener("contextmenu", function(e){e.preventDefault()});
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
        this.context.fillRect(_this.ship.x -10,_this.ship.y-10 , 20, 20);

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
        _this.ship.x =  coords.ship.x
        _this.ship.y =  coords.ship.y;
        _this.ship.vx = coords.ship.vx;
        _this.ship.vy = coords.ship.vy;
    };

    this.update = function () {
        this.interval = setInterval(function () {
            doAction(_this.changing, _this.evt, _this.clicked);
            var coords = _this.requestState(_this.ship, _this.stars);
            // var coords = {};
            // coords.ship = {
            //     x: _this.ship.x + Math.random()*10,
            //     y: _this.ship.y + Math.random()*30 - Math.random()*20
            // };

            _this.updateState(coords);
            _this.render();
        }, this.timeStep)
    };

    this.mousedown = function (event) {
        var cx = event.clientX - _this.canvas.getBoundingClientRect().left;
        var cy = event.clientY - _this.canvas.getBoundingClientRect().top;
        var star = findNearestStar({x: cx, y: cy}, _this.stars);
        _this.clicked = true;
        _this.evt = event.button;
        _this.changing = star;
    };

    this.mouseup = function (event){
        _this.clicked = false;
    };

    this.init();
};


