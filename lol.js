var stars = [];
var starfield;
var rendering;

var allstar_style = 'cursor: default; -moz-user-select: none; -webkit-user-select: none; position: absolute; ';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomGrey() {
	var hexvalues = [ '6', '7', '8', '9', 'a', 'b', 'c' ];
	var randindex = Math.floor(Math.random() * hexvalues.length);
	var hexcode = '';
	for (var i = 0; i < 3; i++) {
		hexcode += hexvalues[randindex];
	}
	return hexcode;
}

function randomColor() {
	var hexvalues = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ];
	var hexcode = '';
	var randindex;
	for (var i = 0; i < 3; i++) {
		randindex = Math.floor(Math.random() * hexvalues.length);
		hexcode += hexvalues[randindex] + hexvalues[randindex];
	}
	return hexcode;
}

function createStar(rand) {
	var rand_x;
	if (rand == undefined || rand == true) {
		rand_x = getRandomInt(1, starfield.clientWidth - 50);
	} else {
		rand_x = getRandomInt(-50, 0);
	}
	var rand_y = getRandomInt(1, starfield.clientHeight - 50);
	var rand_blur = getRandomInt(2, 5);
	var zind = 10 - rand_blur;
	var star_size = 50;
	var color = '000';
	switch (rand_blur) {
		case 2:
		color = '666';
		star_size = 50;
		break;
		case 3:
		color = '888';
		star_size = 40;
		break;
		case 4:
		color = 'aaa';
		star_size = 30;
		break;
		case 5:
		color = 'ccc';
		star_size = 20;
		break;
	}
	if (rand == false) {
		color = randomColor();
	}
	return { x: rand_x, y: rand_y, z: zind, size: star_size, blur: rand_blur, c: color };
}
				
function generateStars(container_id) {
	//console.log(window.innerWidth + "x" + window.innerHeight);
	starfield = document.getElementById(container_id);
	var num_stars = (starfield.clientHeight * starfield.clientWidth) / 10000;
	//var num_stars = 50;
	num_stars = Math.round(num_stars);
	console.log("num stars: " + num_stars);
	for (var i = 0; i < num_stars; i++) {
		var new_star = createStar();
		var new_star_dom = document.createElement('div');
		new_star_dom.setAttribute('class', 'star');
		new_star_dom.setAttribute('id', 'star'+i);
		new_star_dom.setAttribute('style', allstar_style+'top: '+new_star.y+'px; left: '+new_star.x+'px; z-index: '+new_star.z+'; color: #'+new_star.c+'; font-size: '+new_star.size+'px;');
		new_star_dom.innerHTML = '&#9733;';
		starfield.appendChild(new_star_dom);
		stars.push(new_star);
	}
}

function renderStars() {
	for (var i = 0; i < stars.length; i++) {
		var star_id = 'star'+i;
		var star_dom = document.getElementById(star_id);
		switch (stars[i].size) {
			case 50:
			stars[i].x += 1.5;
			break;
			case 40:
			stars[i].x += 1;
			break;
			case 30:
			stars[i].x += 0.75;
			break;
			case 20:
			stars[i].x += 0.25;
			break;
		}
		if (stars[i].x > window.innerWidth) {
			stars[i] = createStar(false);
			star_dom.setAttribute('style', allstar_style+'top: '+stars[i].y+'px; left: '+stars[i].x+'px; z-index: '+stars[i].z+'; color: #'+stars[i].c+'; font-size: '+stars[i].size+'px;');
		} else {
			star_dom.style.left = stars[i].x+'px';
		}
	}
}

window.onload = function() {
	generateStars('header');
	rendering = setInterval(renderStars, (1/30 * 1000));
}