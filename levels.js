
var level1 = {
    stars: [
        {
            M: 200,
            x:250,
            y:650,
            L: 50,
            r: 80,
            image: "./images/star_1.png"
        },
        {
            M: 500,
            x: 1400,
            y: 100,
            L: 200,
            r: 200,
            image: "./images/star_2.png"
        }
    ],
    ship: {
        x: 250,
        y: 500,
        vx: 100*1.41,
        vy: 0,
        image: "./images/spaceship.png",
        r: 40
    },
    end_portal: {
        x: 1500,
        y: 500,
        image: "./images/end_portal_vertical_100x200.png"
    },
    num: 1
}

function getLevel(num){
    var lvl = JSON.stringify(window["level"+num]);
    var lvlP = JSON.parse(lvl);
    return lvlP;
}