/**
 * Created by melontron on 1/20/17.
 */


var stars = [
    {
        M: 1000000000,
        xp: 15 * 0.01, /* part of width */
        yp: 15 * 0.01, /* part of height */
        x : 0,
        y: 0,
        L: 0,
        r: 0,
        rp: 2 * 0.01, /* part of width */
        image: "./images/sun.png"
    },
    // {
    //     M: 100,
    //     x: 200,
    //     y:40,
    //     L: 100,
    //     r: 19,
    //     image: "./images/sun.png"
    // },
    // {
    //     M: 100,
    //     x: 150,
    //     y:160,
    //     L: 100,
    //     r: 30,
    //     image: "./images/sun.png"
    // },
    // {
    //     mass: 100,
    //     x: 400,
    //     y:270,
    //     L: 100,
    //     r: 30,
    //     image: "./images/sun.png"
    // }
];

var ship = {
    xp: 50 * 0.01,
    yp: 50 * 0.01,
    x:0,
    y: 0,
    vxp: 25 * 0.01,
    vyp: 0,
    vx: 0,
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
        _this.coordinateController();
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

        this.context.beginPath();
        this.context.fillStyle = "00FF00";
        this.context.fillRect(_this.ship.x ,_this.ship.y , 20, 20);

        this.stars.map(function (star) {
            _this.context.beginPath();
            _this.context.drawImage(star.image, (star.x - star.r), (star.y - star.r), 2 * star.r, 2*star.r);
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
            // var coords = {};
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
            //var coef = window.innerWidth / _this.screen.w;

            _this.canvas.width = window.innerWidth * _this.canvasSizeP;
            _this.canvas.height = _this.canvas.width * _this.ratio;

            _this.stars.map(function (star) {
                star.xp = (star.x * 100) / _this.canvas.width;
                star.yp = (star.y * 100) / _this.canvas.height;
                star.rp = (star.r * 100) / _this.canvas.width;
            });

            _this.ship.vxp = (_this.ship.vx * 100) / _this.canvas.width;
            _this.ship.vyp = (_this.ship.vy * 100) / _this.canvas.height;

            _this.screen = {
                w: window.innerWidth,
                h: window.innerHeight
            };

            _this.coordinateController();
            // _this.canvas.width = window.innerWidth *  _this.proportion;
            // _this.canvas.height = window.innerHeight * _this.proportion * _this.aspectRatio;
            // _this.stars.map(function (star) {
            //     star.x*= _this.proportion;
            //     star.y*= _this.proportion;
            // })
        })
    }

    this.coordinateController = function () {
        _this.stars.map(function (star) {
            star.x = _this.canvas.width * star.xp;
            star.y = _this.canvas.height * star.yp;

            star.r = _this.canvas.width * star.rp;
        });

        _this.ship.x = _this.canvas.width * ship.xp;
        _this.ship.y = _this.canvas.height * ship.yp;

        _this.ship.vx = _this.canvas.width * ship.vxp;
        _this.ship.vy = _this.canvas.height * ship.vyp;


    }

    this.screen = {
        w: 400,
        h: 350
    }
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.screen.w;
    this.canvas.height = this.screen.h;
    this.context = this.canvas.getContext('2d');
    this.timeStep = 10;
    this.canvasSizeP = 0.5;
    this.ratio = 360 / 480;
    this.init();
};


