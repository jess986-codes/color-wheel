let radius;

function setup() {
	let parentElement = document.getElementById("color-wheel");
	let parentWidth = parentElement.offsetWidth;
	createCanvas(parentWidth, parentWidth * 0.6);
	noStroke();
	currentColor = color(255, 255, 255);
	complementaryColor = color(255, 255, 255);
}

function draw() {
	background(255);

	// Render color wheel
	colorMode(HSB);
	const centerX = width / 2;
	const centerY = height / 2;
	radius = 0.5 * (width / 2) - 10;

	// Set shadow properties
	drawingContext.shadowBlur = 21;
	drawingContext.shadowColor = "rgba(0, 0, 0, 0.16)";

	fill(0, 0, 100);
	circle(centerX, centerY, radius * 2 + 21);

	// Reset shadow for other elements (if needed)
	drawingContext.shadowBlur = 0;
	drawingContext.shadowColor = "rgba(0, 0, 0, 0)";

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

// when mouse is pressed, add/update anchors in the color wheel to visually indicate color combinations
function mousePressed() {
	let distance = dist(mouseX, mouseY, width / 2, height / 2);

	// process colors if click is within color wheel bondaries
	if (distance <= radius) {
		draw();
		colorMode(RGB);

		// get current color and complementary color values
		let currentColor = get(mouseX, mouseY);
		convertColors(currentColor);

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

// convert colours to different color modes and output to inputs fields in HTML
function convertColors(rgbArr) {
	const red = rgbArr[0];
	const green = rgbArr[1];
	const blue = rgbArr[2];

	const rgb = rgbToString(red, green, blue);
	const hex = `#${rgbToHex(red, green, blue)}`;
	const hsl = rgbToHsl(red, green, blue);
	const hsb = rgbToHsb(red, green, blue);

	document.getElementById("selectedColorRgb").value = rgb;
	document.getElementById("selectedColorHex").value = hex;
	document.getElementById("selectedColorHsl").value = hsl;
	document.getElementById("selectedColorHsb").value = hsb;
}

function rgbToString(r, g, b) {
	return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(r, g, b) {
	return ((r << 16) | (g << 8) | b)
		.toString(16)
		.padStart(6, "0")
		.toUpperCase();
}

function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h;
	let s;
	const l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}, ${Math.round(
		l * 100
	)})`;
}

function rgbToHsb(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;
	let h;
	let s;
	const brightness = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		s = delta / (1 - Math.abs(2 * b - 1));

		switch (max) {
			case r:
				h = (g - b) / delta + (g < brightness ? 6 : 0);
				break;
			case g:
				h = (b - r) / delta + 2;
				break;
			case b:
				h = (r - g) / delta + 4;
				break;
		}

		h /= 6;
	}

	return `hsb(${Math.round(h * 360)}, ${Math.round(s * 100)}, ${Math.round(
		b * 100
	)})`;
}
