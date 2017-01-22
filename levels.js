var level1 = {
    stars: [
        {
            M: 50,
            x:300,
            y:600,
            L: 0,
            r: 35*2,
            image: "./images/texture.png",
            lines: "./images/lines1.png",
            color: "#FF0000"
        },
         {
             M: 50,
             x: 540,
             y:100,
             L: 0,
             r: 19*2,
             image: "./images/texture.png",
             lines: "./images/lines1.png",
             color: "#00FF00"
         },
         {
             M: 50,
             x: 1040,
             y:300,
             L: 0,
             r: 50*2,
             image: "./images/texture.png",
             lines: "./images/lines1.png",
             color: "#ff4444"
         }
    ],
    ship: {
        x: 100,
        y: 400,
        vx:  100,
        vy: 0,
        image: "./images/spaceship.png",
        r: 50
    },
    num: 1
}

function getLevel(num){
    var lvl = JSON.stringify(window["level"+num]);
    var lvlP = JSON.parse(lvl);
    return lvlP;
}