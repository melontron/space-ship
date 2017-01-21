var level1 = {
    stars: [
        {
            M: 50,
            x:200,
            y:700,
            L: 0,
            r: 35*2,
            image: "./images/hqdefault.jpg"
        },
        {
             M: 50,
             x: 490,
             y:120,
             L: 0,
             r: 19*2,
             image: "./images/sun.png"
         },
         {
             M: 50,
             x: 1040,
             y:300,
             L: 0,
             r: 50*2,
             image: "./images/sun.png"
         },
         {
             M: 50,
             x: 1300,
             y:800,
             L: 0,
             r: 32*2,
             image: "./images/sun.png"
         },
         {
             M: 50,
             x: 1500,
             y: 500,
             L: 0,
             r: 16*2,
             image: "./images/sun.png"
         }
    ],
    ship: {
        x: 200,
        y: 600,
        vx:  100,
        vy: 0,
        image: "",
        r: 20
    }
}

function getLevel(num){
    var lvl = JSON.stringify(window["level"+num]);
    console.log(typeof lvl)
    var lvlP = JSON.parse(lvl);
    return lvlP;
}