function god(spaceship, stars, affect){
    affect = affect || 1;
	var affecting = findNearestStars(spaceship, stars, affect);

	var fx = 0;
	var fy = 0;
	affecting.map(function (star) {
		var res = getForceProjections(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, star.x, star.y, star.M, star.L);
		fx += res.fx;
		fy += res.fy;
	});

	return {
		ship: getShipNextState(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, fx, fy),
		stars: getStarNextState(stars)
	};
}

function superGod(spaceship, stars){
	var forces = stars
	.map(function (star) {
		return getForceProjections(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, star.x, star.y, star.M, star.L);
	})
	.map(function(force){
		force.force= Math.sqrt(force.fx * force.fx + force.fy * force.fy);
		return force;
	})
	.sort(function(f1, f2){
		return f1.force < f2.force;
	})
	.slice(0, 2);

	if ((forces[0].force - forces[1].force) / forces[0].force < 0.1){
		return {
			ship: getShipNextState(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, 0, 0),
			stars: getStarNextState(stars)
		};
	} else {
		return {
			ship: getShipNextState(spaceship.x, spaceship.y, spaceship.vx, spaceship.vy, forces[0].fx, forces[0].fy),
			stars: getStarNextState(stars)
		};
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

function getForceProjections(x, y, vx, vy, sx, sy, M, L){
    x += vx * t / 2;
    y += vy * t / 2;
	var r2 = (x - sx) * (x - sx) + (y - sy) * (y - sy);
	var f = (alpha * M + beta * L) / r2;
	var r = Math.sqrt(r2);
	return {
		fx: f / r * (x - sx), 
		fy: f / r * (y - sy)
	};
}