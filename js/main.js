Array.prototype.removeIf = function (callback) {
	let i = this.length;
	while (i--) {
		if (callback(this[i], i)) {
			this.splice(i, 1);
		}
	}
};

let textureHandler;
let physicsHandler;
let eventHandler;

let camera;
let player;

let showDebug = false;

let levels;
let currentLevel;

let drawables;

//load files
function preload() {
	textureHandler = new TextureHandler();
	textureHandler.loadAni("kid", "textures/kid", "kid-walk");
	// textureHandler.loadImage("", "textures/character.png");
	textureHandler.loadImage("wall", "textures/wall.png");
	textureHandler.loadImage("backwall", "textures/backwall.png");

	textureHandler.loadImage("platform", "textures/platform.png");
	textureHandler.loadImage("spider-hang", "textures/spider-hang.png");
	textureHandler.loadImage("spider-walk", "textures/spider.png");
	textureHandler.loadImage("cobweb", "textures/cobweb.png");

	// bam = loadSound("sounds/BAMM.wav")
}

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	noSmooth();

	drawables = [];

	camera = new CameraController(player);
	camera.setPos(0, 300);
	let isWide = width >= (height * 16 / 9);
	// camera.zoom = isWide ? height / 1080 : width / 1920;
	camera.zoom = 3;

	physicsHandler = new PhysicsHandler();
	eventHandler = new EventHandler();

	player = new Player(textureHandler.getAni("kid"));
	player.setPos(400, 200);
	physicsHandler.addCollidable(player);

	levels = [];
	levels.push(new Entrance());
	levels.push(new Elevator());

	currentLevel = 1;
	levels[currentLevel].start();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function addDrawable(drawable) {
	drawables.push(drawable);
}

function removeDrawable(drawable) {
	if (drawables.includes(drawable)) {
		let i = drawables.indexOf(drawable);
		drawables.splice(i, 1);
	}
}

function draw() {
	movePlayer();
	physicsHandler.applyPhysics();
	render();
}

function render() {
	// background(30, 34, 64);
	background(0);
	camera.focus();

	levels[currentLevel].update();

	for (let drawable of drawables) {
		drawable.display();
	}
	player.display();

	if (showDebug) {
		for (let thing of physicsHandler.collidables) {
			thing.hitbox.display();
		}
	}

	fill(255);
	text(round(camera.minX()) + "," + round(camera.minY()), camera.minX(), camera.minY() + 10);
}

function onDeath() {
	levels[currentLevel].rewind();
}

function nextLevel() {
	levels[currentLevel].end();
	currentLevel++;
	levels[currentLevel].start();
}

const acceleration = 0.2;
const maxSpeed = 5;

function movePlayer() {
	if (keyIsDown(65)) { //a
		player.walk(-acceleration, maxSpeed);
	}
	if (keyIsDown(68)) { //d
		player.walk(acceleration, maxSpeed);
	}
	if (keyIsDown(87)) { //w
		player.jump(110);
	}
}

function keyTyped() {
	switch (keyCode) {
		case 32:
			let spider = new Spider();
			drawables.push(spider);
			spider.spawn(player.pos.x, -300);
			break;
		case 81:
			showDebug = !showDebug;
			break;
	}
}

function mousePressed() {
	let isFull = fullscreen();
	fullscreen(!isFull);
}

function keyReleased() {
	switch (keyCode) {
		case 82: //r
			levels[currentLevel].rewind(player);
			break;
	}
	if (keyCode === 87) { //w
		player.hasJumpedOnce = false;
	}
}