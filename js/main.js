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
let lifebar;

let levels;
let currentLevel;

let drawables;
let monsters;

let music;
let jumpSound;
let spitSound;
let bookSound;
let globeBonk;
let successSound;

let swordSound;

let monsterQueue;
let showDebug = false;

//load files
function preload() {
	loadImage('js/font/pixel-font.min.png', img => loadLetters(img));
	monsterQueue = loadStrings("js/monster-queue.txt");

	music = loadSound("sounds/sad.mp3");
	jumpSound = loadSound("sounds/jump.wav");
	spitSound = loadSound("sounds/spit.wav");
	bookSound = loadSound("sounds/book-slap.wav");
	swordSound = loadSound("sounds/slash2.wav");
	globeBonk = loadSound("sounds/globe-bonk.wav");
	successSound = loadSound("sounds/success.mp3");

	textureHandler = new TextureHandler();
	textureHandler.loadImage("grandpa", "textures/grandpa.png");
	textureHandler.loadImage("grandpa-smile", "textures/grandpa-smile.png");

	textureHandler.loadAni("kid", "textures/kid", "kid-walk");
	textureHandler.loadAni("kid-hit", "textures/kid", "kid-hit");

	textureHandler.loadImage("heart", "textures/heart.png");
	textureHandler.loadImage("wall", "textures/wall.png");
	textureHandler.loadImage("backwall", "textures/backwall.png");
	textureHandler.loadImage("controls", "textures/controls.png");
	textureHandler.loadImage("shelf", "textures/shelf.png");

	textureHandler.loadImage("platform", "textures/platform.png");
	textureHandler.loadImage("globe", "textures/globe2.png");
	textureHandler.loadImage("book", "textures/book.png");
	textureHandler.loadImage("spider-hang", "textures/spider-hang.png");
	textureHandler.loadImage("spider-walk", "textures/spider.png");
	textureHandler.loadImage("cobweb", "textures/cobweb.png");

}

let elevator;

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	noSmooth();

	drawables = [];
	monsters = [];

	camera = new CameraController();
	windowResized();

	physicsHandler = new PhysicsHandler();
	eventHandler = new EventHandler();

	player = new Player(textureHandler.getAni("kid"));
	player.hasGravity = false;

	lifebar = new Healthbar(5);

	levels = [];
	levels.push(new Entrance());
	levels.push(elevator = new Elevator(monsterQueue));
	levels.push(new TheEnd());

	currentLevel = 0;
	levels[currentLevel].start();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	let isWide = width >= (height * 16 / 9);
	camera.zoom = isWide ? height / 1080 : width / 1920;
	camera.zoom *= 3;
}

function addDrawable(drawable) {
	if (!drawables.includes(drawable)) {
		drawables.push(drawable);
	}
}

function removeDrawable(drawable) {
	if (drawables.includes(drawable)) {
		let i = drawables.indexOf(drawable);
		drawables.splice(i, 1);
	}
}

function addMonster(monster) {
	addDrawable(monster);
	monsters.push(monster);
}

function removeMonster(monster) {
	removeDrawable(monster);
	physicsHandler.removeCollidable(monster);

	if (monsters.includes(monster)) {
		let i = monsters.indexOf(monster);
		monsters.splice(i, 1);
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
	levels[currentLevel].update();

	if (currentLevel === 1) {
		player.display();
	}

	lifebar.display();

	if (showDebug) {
		for (let thing of physicsHandler.collidables) {
			thing.hitbox.display();
		}
	}
}

function resetLevel() {
	levels[currentLevel].rewind(player);
	for (let monster of monsters) {
		removeDrawable(monster);
		physicsHandler.removeCollidable(monster);
	}
	monsters = [];
}

function nextLevel() {
	levels[currentLevel].end();
	currentLevel++;
	levels[currentLevel].start();
}

const acceleration = 0.15;
const maxSpeed = 4;

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
		case 81: //q
			showDebug = !showDebug;
			break;
		case 82: //r
			resetLevel();
			break;
	}
}

function keyPressed() {
	if (keyCode === 27) { //escape
		let isFull = fullscreen();
		fullscreen(!isFull);
	}
}

function mousePressed() {
	player.attack();
}

function keyReleased() {
	if (keyCode === 87) { //w
		player.hasJumpedOnce = false;
	}
}