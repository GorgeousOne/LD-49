
Array.prototype.removeIf = function(callback) {
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

let showDebug = true;

let levels;
let currentLevel;

let bam;
let drawables;

//load files
function preload() {
	textureHandler = new TextureHandler();
	textureHandler.loadAni("genga", "textures/gengar-walk", "gengar-walk");
	textureHandler.loadImage("wall", "textures/leftwall.png");
	textureHandler.loadImage("platform", "textures/platform.png");
	// bam = loadSound("sounds/BAMM.wav")
}

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();

	drawables = [];

	// eventHandler.addCollisionListener(this);
	physicsHandler = new PhysicsHandler();
	eventHandler = new EventHandler();

	player = new Player(textureHandler.getAni("genga"));
	player.setPos(400, 200);
	physicsHandler.addCollidable(player);

	camera = new CameraController(player);
	camera.setPos(0, 300);

	let isWide = width >= (height * 16/9);

	camera.zoom = isWide ? height / 1080 : width / 1920;
	camera.zoom *= 3;

	levels = [];
	levels.push(new Entrance());
	levels.push(new Elevator());

	currentLevel = 1;
	levels[currentLevel].start();
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
	background(0);
	camera.focus();

	for (let drawable of drawables) {
		drawable.display();
	}
	player.display();

	if (showDebug) {
		for (let thing of physicsHandler.collidables) {
			thing.hitbox.display();
		}
	}

	let cursorX = (mouseX - width/2) / camera.zoom + camera.pos.x;
	let cursorY = (mouseY - height/2) / camera.zoom + camera.pos.y;

	fill(255);
	text(round(cursorX) + "," + round(cursorY), cursorX, cursorY + 20);
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