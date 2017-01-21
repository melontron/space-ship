function getDist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function dist(a, b){
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

function findNearestStars(spaceship, stars, affect){
	return stars
	.sort(function(s1, s2){
	    return dist(spaceship, s1) > dist(spaceship, s2);
	})
	.slice(0, affect);
}

function findNearestStar(spaceship, stars){
	return findNearestStars(spaceship, stars, 1)[0];
}

function getClickedStar(spaceship, stars){
	console.log (spaceship);
	var nStar = findNearestStar(spaceship, stars);
	console.log (stars)
	console.log (nStar)
	return Math.sqrt(dist(spaceship, nStar)) <= nStar.r ? nStar: -1;
}

function doAction(star, event, active){
	if (active){
		switch(event){
			case 0:
				if (availableL > 0){
					star.L += dL;
					availableL -= dL;
				}
				break;
			case 2:
				if (availableM > 0){
					star.M += dM;
					availableM -= dM;
				}
				break;
			default:
		}
	}
}

function detectCollision(ship, stars, boundingRect) {
    var delta = 15;
    var z = stars.every(function (star) {
        return getDist(ship.x, ship.y, star.x, star.y) >= ship.r + star.r - delta;
    });

    return !z || ((ship.x + ship.r) > boundingRect.x2 ||
        (ship.x - ship.r) < boundingRect.x1 ||
        (ship.y + ship.r) >  boundingRect.y2 ||
        (ship.y - ship.r) < boundingRect.y1);
}