var alpha =  -0.01;
var beta = 0.5;
var t = 0.001;

// var fs = require('fs')
// var csvWriter = require('csv-write-stream')
// var writer = csvWriter()
// writer.pipe(fs.createWriteStream('out.csv'))

// var spaceship = {
// 	x: 0, y: 1, vx: 10, vy: 0
// };

// var stars = [{
// 	x: 0, y: 0, M: 10000, L: 0
// }];

function god(spaceship, stars){
	var fx = 0;
	var fy = 0;
	stars.map(function (star) {
		var res = getForceProjections(spaceship.x, spaceship.y, star.x, star.y, star.M, star.L);
		fx += res[0];
		fy += res[1];
	})

	return {
		ship: getShipNextState(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, fx, fy),
		stars: getStarNextState(stars)
	}
}

function getStarNextState(stars){
	return stars;
}

function getShipNextState(x, y, Vx, Vy, fx, fy){
	return {
		x: x + Vx * t + fx * t * t / 2,
		y: y + Vy * t + fy * t * t / 2,
		vx: Vx + fx * t,
		vy: Vy + fy * t
	};
}

function getForceProjections(x, y, sx, sy, M, L){
	var r2 = (x - sx) * (x - sx) + (y - sy) * (y - sy);
	var f = (alpha * M + beta * L) / r2;
	var r = Math.sqrt(r2);
	return [f / r * (x - sx), f / r * (y - sy)];
}

// for (var i = 0; i < 1000; ++i){
// 	res = god(spaceship, stars);
// 	spaceship.x = res.ship.x;
// 	spaceship.y = res.ship.y;
// 	spaceship.vx = res.ship.vx;
// 	spaceship.vy = res.ship.vy;
	// console.log (spaceship);
	// writer.write(spaceship);
// }

// writer.end()