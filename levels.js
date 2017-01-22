//
//
var level2 = {
    stars: [
        {
            M: 200,
            x:250,
            y:650,
            L: 50,
            r: 80,
            image: "./images/bro.png",
        },
        {
             M: 500,
             x: 1400,
             y: 100,
             L: 200,
             r: 250,
             image: "./images/xecgetin.png",
         }
    ],
    ship: {
        x: 250,
        y: 500,
        vx:  100*1.41,
        vy: 0,
        image: "./images/STARSHIP_1.png",
        r: 50
    },
    end_portal: {
            x: 1450,
            y: 400,
            w: 150,
            h: 300,
            image: "./images/end_portal_vertical_100x200.png"
    },
    num: 2
}

var level1 = {
    stars: [
        {
            M: 200,
            x: 800,
            y: 550,
            L: 50,
            r: 80,
            image: "./images/oven.png",
        },
        {
             M: 500,
             x: 100,
             y: 100,
             L: 200,
             r: 200,
             image: "./images/cul.png",
         }
    ],
    ship: {
        x: 800,
        y: 400,
        vx:  100*1.41,
        vy: 0,
        image: "./images/STARSHIP_1.png",
        r: 50
    },
    end_portal: {
            x: 1100,
            y: 450,
            w: 200,
            h: 110,
            image: "./images/yelqi portal.png"
    },
    num: 1
}
//
//
//
var level4 = {
    stars: [
        {
            M: 125,
            x:200,
            y:800,
            L: 25,
            r: 80,
            image: "./images/ksherq.png",
        },
        {
             M: 75,
             x: 800,
             y:400,
             L: 25,
             r: 50,
             image: "./images/karich.png",
         },
         {
             M: 150,
             x: 1400,
             y:300,
             L: 50,
             r: 75,
             image: "./images/aghexnavor.png",
         },
         {
             M: 400,
             x:450,
             y:100,
             L: 0,
             r: 10,
             image: "./images/black hall.png",
         },
    ],
    ship: {
        x: 50,
        y: 600,
        vx:  70,
        vy: 5,
        image: "./images/STARSHIP_1.png",
        r: 40
    },
     end_portal: {
        x: 1500,
        y: 20,
        w: 100,
        h: 200,
        image: "./images/end_portal_vertical_100x200.png"
       },
    num: 4
}

var level5 = {
    stars: [
        {
            M: 75,
            x:600,
            y: 750,
            L: 25,
            r: 60,
             image: "./images/aycyexdjyur.png",
        },
        {
             M: 75,
             x: 320,
             y:250,
             L: 25,
             r: 50,
             image: "./images/jrhos.png",
         },
         {
             M: 75,
             x: 1100,
             y: 350,
             L: 25,
             r: 60,
             image: "./images/dzkner.png",
         }
    ],
    ship: {
        x: 70,
        y: 670,
        vx: 100,
        vy: 0,
        image: "./images/STARSHIP_1.png",
        r: 40
    },
    end_portal: {
        x: 1100,
        y: 700,
        w: 200,
        h: 110,
        image: "./images/yelqi portal.png"
    },
    num: 5
}

var level3 = {
    stars: [
        {
            M: 75,
            x: 270,
            y: 550,
            L: 25,
            r: 40,
            image: "./images/lion.png"
        },
        {
            M: 75,
            x: 1000,
            y: 250,
            L: 25,
            r: 150,
            image: "./images/kuys.png"
        }
    ],
    ship: {
        x: 100,
        y: 70,
        vx: 0,
        vy: 90,
        image: "./images/STARSHIP_1.png",
        r: 50
      },
  end_portal: {
      x: 1450,
      y: 400,
      w: 150,
      h: 300,
      image: "./images/end_portal_vertical_100x200.png"
      },
    num: 3
}
//////
var level6 = {
    stars: [
        {
            M: 75,
            x: 300,
            y: 800,
            L: 25,
            r: 60,
            image: "./images/bro.png",
        },
        {
             M: 75,
             x: 800,
             y: 800,
             L: 25,
             r: 50,
            image: "./images/lion.png",
         },
         {
             M: 75,
             x: 1300,
             y: 800,
             L: 25,
             r: 60,
            image: "./images/karich.png",
         },
         {
              M: 75,
              x: 550,
              y: 200,
              L: 25,
              r: 50,
              image: "./images/ksherq.png",
        },
        {
              M: 75,
              x: 1050,
              y: 200,
              L: 25,
              r: 60,
              image: "./images/cul.png",
        }
],
    ship: {
        x: 70,
        y: 450,
        vx: 30,
        vy: 20,
       image: "./images/STARSHIP_1.png",
               r: 50
             },
     end_portal: {
             x: 1400,
             y: 0,
             w: 200,
             h: 110,
             image: "./images/yelqi portal.png"
         },
       num: 6
    }

function getLevel(num){
    var lvl = JSON.stringify(window["level"+num]);
    var lvlP = JSON.parse(lvl);
    return lvlP;
}