function god(spaceship, stars, affect){
    affect = affect || 1;
	var affecting = findNearestStars(spaceship, stars, affect);

	var fx = 0;
	var fy = 0;
	affecting.map(function (star) {
		var res = getForceProjections(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, star.x, star.y, star.M, star.L);
		fx += res[0];
		fy += res[1];
	});

	return {
		ship: getShipNextState(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, fx, fy),
		stars: getStarNextState(stars)
	};
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

function getForceProjections(x, y, vx, vy, sx, sy, M, L){
    x += vx * t / 2;
    y += vy * t / 2;
	var r2 = (x - sx) * (x - sx) + (y - sy) * (y - sy);
	var f = (alpha * M + beta * L) / r2;
	var r = Math.sqrt(r2);
	return [f / r * (x - sx), f / r * (y - sy)];
}