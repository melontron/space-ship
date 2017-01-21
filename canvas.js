/**
 * Created by melontron on 1/20/17.
 */


var stars = [
    {
        M: 45,
        x:60,
        y:270,
        L: 0,
        r: 17,
        image: "./images/sun.png"
    },
     // {
     //     M: 200,
     //     x: 250,
     //     y:50,
     //     L: 0,
     //     r: 19,
     //     image: "./images/sun.png"
     // },
     // {
     //     M: 200,
     //     x: 400,
     //     y:200,
     //     L: 0,
     //     r: 25,
     //     image: "./images/sun.png"
     // }

];

var ship = {
    x: 60,
    y: 230,
    vx:  150,
    vy: 0,
    image: ""
}

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
        _this.bindEvets();
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

        var shipX = ( _this.canvas.width * ship.x ) / _this.canvasWidth;
        var shipY = ( _this.canvas.height * ship.y ) / _this.canvasHeight;

        this.context.beginPath();
        this.context.fillStyle = "00FF00";
        this.context.fillRect(_this.ship.x -10,_this.ship.y-10 , 20, 20);

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
            var coords = _this.requestState(_this.ship, _this.stars);
            _this.updateState(coords);
            _this.render();
        }, this.timeStep)
    };


    this.clickHandler = function (event) {
        var cx = event.clientX - _this.canvas.getBoundingClientRect().left;
        var cy = event.clientY- _this.canvas.getBoundingClientRect().top;
        var star = _this.findClickedStar(cx, cy);

        _this.stars[0].L += 10;
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

    this.bindEvets = function () {
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
    this.timeStep = 50;
    this.canvasWidth = 400;
    this.canvasHeight = 300;
    this.canvasSizeP = 0.5;
    this.ratio = 0.75;
    this.init();
};


