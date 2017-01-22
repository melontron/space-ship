/**
 * Created by melontron on 1/20/17.
 */
var Controller = function (canvasId, level) {
    var _this = this;
    this.init = function (level) {

        _this.ship = level.ship;
        _this.end_portal = level.end_portal;
        _this.stars = level.stars.map(function (star) {
            var sImage = new Image();
                sImage.src = star.image;
                star.image = sImage;
            return star;
        });

        _this.screen = {
            w: window.innerWidth,
            h: window.innerHeight
        };

        _this.canvas.width = _this.screen.w * _this.canvasSizeP;
        _this.canvas.height = _this.canvas.width * _this.ratio;

        var img = new Image();
            img.src = _this.playButton.image;
        _this.playButton.image = img;
        _this.playButton.show = false;
        _this.bindEvents();

        _this.canvas.addEventListener("mousedown", _this.mousedown);
        //_this.canvas.addEventListener("click", _this.click);
        _this.canvas.addEventListener("mouseup", _this.mouseup);
        _this.canvas.addEventListener("contextmenu", function(e){e.preventDefault()});
        _this.render();
        _this.update();
    };

    this.render = function () {
        _this.clear();

        this.context.beginPath();
        this.context.fillStyle = "#FF0000";

        var bg = new Image();
            bg.src = "./images/background.png";
        this.context.drawImage(bg,0,0,this.canvas.width, this.canvas.height);
        this.context.stroke();

        this.stars.map(function (star) {
            var circleX = ( _this.canvas.width * (star.x ) ) / _this.canvasWidth;
            var circleY = ( _this.canvas.height* (star.y ) ) / _this.canvasHeight;

            var starX = ( _this.canvas.width * (star.x - star.r) ) / _this.canvasWidth;
            var starY = ( _this.canvas.height * (star.y - star.r) ) / _this.canvasHeight;
            var starR = ( _this.canvas.width * star.r ) / _this.canvasWidth;

            _this.context.beginPath();
            _this.context.arc(circleX, circleY, starR, 0, 2 * Math.PI);
            _this.context.drawImage(star.image, starX, starY, 2 * starR, 2*starR);
            _this.context.stroke();
        });

        var shipX = ( _this.canvas.width * (ship.x - ship.r) ) / _this.canvasWidth;
        var shipY = ( _this.canvas.height * (ship.y - ship.r) ) / _this.canvasHeight;
        var shipR = ( _this.canvas.width * ship.r ) / _this.canvasWidth;


        this.context.beginPath();
        this.canvas.fillStyle = "#FF0000";
        var shipImage = new Image();
            shipImage.src = _this.ship.image;
        this.context.drawImage(shipImage, shipX, shipY, 2 * shipR, 2 * shipR);
        this.context.stroke();

        var endPortalX = ( _this.canvas.width * _this.end_portal.x ) / _this.canvasWidth;
        var endPortalY = ( _this.canvas.width * _this.end_portal.y ) / _this.canvasWidth;

        this.context.beginPath();
        this.canvas.fillStyle = "#FF0000";
        var end_portal_image = new Image();
            end_portal_image.src = _this.end_portal.image;

        this.context.drawImage(end_portal_image, endPortalX - 100 , endPortalY - 100 , 100, 200);
        this.context.stroke();

        if( _this.playerStatus !== "alive" ){
            this.renderPlayButton();
        }
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
            var coords = superGod(_this.ship, _this.stars);
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

                _this.playButton.show = true;
                _this.playerStatus = "died";
                _this.render();

            }

        }, this.timeStep)
    };

    this.mousedown = function (event) {
        if( _this.deleted ) return;
        var cx = (event.clientX - _this.canvas.getBoundingClientRect().left) * _this.canvasWidth / _this.canvas.width;
        var cy = (event.clientY - _this.canvas.getBoundingClientRect().top) * _this.canvasHeight / _this.canvas.height;
        var star = getClickedStar({x: cx, y: cy}, _this.stars);
        _this.clicked = true;
        _this.evt = event.button;
        _this.changing = star;

        _this.btnClick(event, _this.playButton);

    };
    
    this.btnClick = function (event, btn) {
        if (_this.deleted) return;
        var res = false;
        var cx = (event.clientX - _this.canvas.getBoundingClientRect().left) ;
        var cy = (event.clientY - _this.canvas.getBoundingClientRect().top) ;

        //check play button click
        if( _this.playButton.show ){
            if( btn.x1 < cx &&
                btn.x2 > cx &&
                btn.y1 < cy &&
                btn.y2 > cy){

                var lvl;
                if(btn.type == "play"){
                    lvl = getLevel(_this.level.num);
                }
                else if( btn.type == "next" ){
                    lvl = getLevel(_this.level.num + 1);
                }

                _this.deleted = true;
                delete _this.canvas;
                delete controllers.pop();

                controllers.push( Controller( canvasId, lvl ) )
            }
        }


    }

    this.mouseup = function (event){
        if(_this.deleted) return;
        _this.clicked = false;
    };

    this.bindEvents = function () {
        window.addEventListener("resize",function (event) {
            _this.screen = {
                w: window.innerWidth,
                h: window.innerHeight
            };
            _this.canvas.width = _this.screen.w * _this.canvasSizeP;
            _this.canvas.height = _this.canvas.width * _this.ratio;
            if( _this.playerStatus !== "alive" ){
                _this.render();
            }
        })
    }


    this.renderPlayButton = function () {
        var btnX =  0.5 * _this.canvas.width;
        var btnY = 0.5 * _this.canvas.height;
        console.log("renderPlayButton", _this.playButton)
        if( _this.playButton.show ){
            
            _this.context.beginPath();
            // console.log(canvasId);
            // stackBlurCanvasRGBA(canvasId, 0, 0, _this.canvas.width, _this.canvas.height, 35);
            _this.context.closePath();
            _this.context.fill();
            var sx = (btnX - 0.5*_this.playButton.w  * _this.canvas.width / _this.canvasWidth  );
            var sy = (btnY - 0.5*_this.playButton.h *  _this.canvas.height / _this.canvasHeight);

            var fx = _this.playButton.w * _this.canvas.width / _this.canvasWidth;
            var fy = _this.playButton.h * _this.canvas.height / _this.canvasHeight;

            _this.playButton.x1 = sx;
            _this.playButton.y1 = sy;
            _this.playButton.x2 = fx + sx;
            _this.playButton.y2 = fy + sy;

            _this.context.beginPath();
            _this.context.drawImage(_this.playButton.image, sx, sy, fx, fy);
            _this.context.closePath();
            _this.context.stroke();
        }
    };
    //run

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.timeStep = 10;
    this.clicked = false;
    this.evt = 0;
    this.level = level;
    this.changing = null;
    this.deleted = false;
    this.canvasWidth = 1600;
    this.canvasHeight = 900;
    this.canvasSizeP = 0.8;
    this.ratio = 0.5625;
    this.playerStatus = "alive";
    this.playButton = {
        image : "./images/playbutton.png",
        show: false,
        w: 245.2,
        h: 100,
        type: "play"
    }
    this.init(level);
};