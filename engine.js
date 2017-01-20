let alpha =  -0.01;
let beta = 0.5;
let t = 0.001;

// var fs = require('fs')
// var csvWriter = require('csv-write-stream')
// var writer = csvWriter()
// writer.pipe(fs.createWriteStream('out.csv'))

// let spaceship = {
// 	x: 0, y: 1, vx: 10, vy: 0
// };

// let stars = {
// 	x: 0, y: 0, M: 10000, L: 0
// };

function god(spaceship, stars){
	[fx, fy] = [0, 0];
	stars.map(star => {
		[dfx, dfy] = getForceProjections(spaceship.x, spaceship.y, stars.x, stars.y, stars.M, stars.L);
		fx += dfx;
		fy += dfy;
	});
	
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
	let r2 = (x - sx) * (x - sx) + (y - sy) * (y - sy);
	let f = (alpha * M + beta * L) / r2;
	let r = Math.sqrt(r2);
	return [f / r * (x - sx), f / r * (y - sy)];
}

// for (var i = 0; i < 1000; ++i){
	// [x, y, Vx, Vy] = god(spaceship, stars);
	// spaceship.x = x;
	// spaceship.y = y;
	// spaceship.vx = Vx;
	// spaceship.vy = Vy;
	// console.log (`${x} ${y}`);
	// writer.write(spaceship);
// }

// writer.end()