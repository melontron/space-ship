/**
 * Created by melontron on 1/20/17.
 */
var Controller = function (canvasId, stars, ship) {
    var _this = this;
    this.init = function () {
        _this.stars = [];
        stars.map(function (star) {
            var sImage = new Image();
                sImage.src = star.image;
                star.image = sImage;
                _this.stars.push(star);
        });

        _this.screen = {
            w: window.innerWidth,
            h: window.innerHeight
        };

        _this.canvas.width = _this.screen.w * _this.canvasSizeP;
        _this.canvas.height = _this.canvas.width * _this.ratio;

        _this.ship = ship;
        _this.bindEvents();

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

        // var shipX = ( _this.canvas.width * ship.x ) / _this.canvasWidth;
        // var shipY = ( _this.canvas.height * ship.y ) / _this.canvasHeight;

        var shipX = ( _this.canvas.width * (ship.x) ) / _this.canvasWidth;
        var shipY = ( _this.canvas.height * (ship.y) ) / _this.canvasHeight;
        var shipR = ( _this.canvas.width * ship.r ) / _this.canvasWidth;


        this.context.beginPath();
        this.context.fillStyle = "00FF00";
        this.context.arc(shipX, shipY, shipR, 0, 2 * Math.PI);
        this.context.stroke();

        this.stars.map(function (star) {
            var starX = ( _this.canvas.width * (star.x - star.r) ) / _this.canvasWidth;
            var starY = ( _this.canvas.height * (star.y - star.r) ) / _this.canvasHeight;
            var starR = ( _this.canvas.width * star.r ) / _this.canvasWidth;
            //console.log(starX,starY,starR);
            _this.context.beginPath();
            _this.context.drawImage(star.image, starX, starY, 2 * starR, 2*starR);
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
            _this.updateState(coords);
            _this.render();

            var boundingRect = {
                x1: 0,
                y1: 0,
                x2: _this.canvasWidth,
                y2: _this.canvasHeight
            }
            if( detectCollision(_this.ship, _this.stars, boundingRect)) {
                clearInterval(_this.interval);
            }

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

    this.mouseup = function (event) {
        _this.clicked = false;
    }

    this.bindEvents = function () {
        window.addEventListener("resize",function (event) {
            _this.screen = {
                w: window.innerWidth,
                h: window.innerHeight
            };
            _this.canvas.width = _this.screen.w * _this.canvasSizeP;
            _this.canvas.height = _this.canvas.width * _this.ratio;
        })
    }

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.timeStep = 10;
    this.clicked = false;
    this.evt = 0;
    this.changing = null;
    this.canvasWidth = 1200;
    this.canvasHeight = 900;
    this.canvasSizeP = 0.5;
    this.ratio = 0.75;
    this.init();
};

var detectCollision = function (ship, stars, boundingRect) {
    var collided = false;
    var delta = 15;
    stars.map(function (star) {
        var dest = getDist(ship.x, ship.y, star.x, star.y);
        if( dest < ship.r + star.r - delta){
            collided = true;
        }
    });

    if( (ship.x + ship.r) > boundingRect.x2 ||
        (ship.x - ship.r) < boundingRect.x1 ||
        (ship.y + ship.r) >  boundingRect.y2 ||
        (ship.y - ship.r) < boundingRect.y1){
        collided = true;
    }
    return collided;
}

