let radius;

function setup() {
	createCanvas(800, 800);
	noStroke();
	currentColor = color(255, 255, 255);
	complementaryColor = color(255, 255, 255);
}

function draw() {
	// Render color wheel
	colorMode(HSB);
	const centerX = width / 2;
	const centerY = height / 2;
	radius = min(width, height) / 2 - 10;

	for (let h = 0; h < 360; h++) {
		for (let s = 0; s < 100; s += 2) {
			const b = 90;

			const angle = radians(h);
			const rPos = (s / 100) * radius;
			const x = centerX + cos(angle) * rPos;
			const y = centerY + sin(angle) * rPos;

			noStroke();
			fill(h, s, b);
			circle(x, y, 10);
		}
	}

	noLoop();
}

function mousePressed() {
	let distance = dist(mouseX, mouseY, width / 2, height / 2);

	// process colors if click is within color wheel bondaries
	if (distance <= radius) {
		draw();
		colorMode(RGB);

		// get current color and complementary color values
		let currentColor = get(mouseX, mouseY);

		let vx = mouseX - width / 2;
		let vy = mouseY - height / 2;
		let oppositePointX = width / 2 - vx;
		let oppositePointY = height / 2 - vy;
		let complementaryColor = get(oppositePointX, oppositePointY);

		// add current and completary color locations on color wheel
		stroke(255);
		strokeWeight(6);
		noFill();
		circle(mouseX, mouseY, 20);
		circle(oppositePointX, oppositePointY, 15);

		// update color swatches in html
		document.getElementById(
			"selectedColorBox"
		).style.backgroundColor = `rgb(${red(currentColor)}, ${green(
			currentColor
		)}, ${blue(currentColor)})`;

		document.getElementById(
			"complementaryColorBox"
		).style.backgroundColor = `rgb(${red(complementaryColor)}, ${green(
			complementaryColor
		)}, ${blue(complementaryColor)})`;
	}
}
