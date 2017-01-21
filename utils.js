function getDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function dist(a, b){
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

function findNearestStars (spaceship, stars, affect){
	return stars
	.sort(function(s1, s2){
	    return dist(spaceship, s1) > dist(spaceship, s2);
	})
	.slice(0, affect);
}

function findNearestStar (spaceship, stars){
	return findNearestStars(spaceship, stars, 1)[0];
}

function doAction(star, event, active){
	if (active){
		switch(event){
			case 0:
				star.L += 0.2;
				break;
			case 2:
				star.M += 0.2;
				break;
			default:
		}
	}
}