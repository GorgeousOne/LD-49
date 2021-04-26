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

let swordSound;

let monsterQueue;
let showDebug = false;

//load files
function preload() {
	monsterQueue = loadStrings("js/monster-queue.txt");
	music = loadSound("sounds/sad.mp3");
	jumpSound = loadSound("sounds/jump.mp3");
	spitSound = loadSound("sounds/spit.mp3");
	bookSound = loadSound("sounds/book-slap.wav");
	swordSound = loadSound("sounds/slash2.wav");
	globeBonk = loadSound("sounds/globe-bonk.wav");

	textureHandler = new TextureHandler();
	textureHandler.loadAni("kid", "textures/kid", "kid-walk");
	textureHandler.loadAni("kid-hit", "textures/kid", "kid-hit");

	textureHandler.loadImage("heart", "textures/heart.png");
	textureHandler.loadImage("wall", "textures/wall.png");
	textureHandler.loadImage("backwall", "textures/backwall.png");
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

	lifebar = new Healthbar(3);

	levels = [];
	levels.push(new Entrance());
	levels.push(elevator = new Elevator(monsterQueue));

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

	levels[currentLevel].update();

	for (let drawable of drawables) {
		drawable.display();
	}

	player.display();
	lifebar.display();

	if (showDebug) {
		for (let thing of physicsHandler.collidables) {
			thing.hitbox.display();
		}
	}

	fill(255);
	let cursorX = (mouseX - width / 2 + camera.focusOffset.x * width) / camera.zoom + camera.pos.x;
	text(round(cursorX), camera.minX(), camera.minY() + 10);
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
	let cursorX = (mouseX - width / 2 + camera.focusOffset.x * width) / camera.zoom + camera.pos.x;
	switch (keyCode) {
		case 49: //1
			console.log(elevator.depth, Math.floor(cursorX), "spid");
			let spider = new Spider(cursorX, -300);
			addMonster(spider);
			spider.spawn();
			break;

		case 51: //2
			console.log(elevator.depth, Math.floor(cursorX), "glob");
			let globe = new Globe(cursorX, -300);
			addMonster(globe);
			globe.spawn();
			break;

		case 50: //3
			console.log(elevator.depth, Math.floor(cursorX), "book");
			let book = new Book(cursorX, -300);
			addMonster(book);
			book.spawn();
			break;

		case 81: //q
			showDebug = !showDebug;
			break;
		case 82: //r
			resetLevel();
			break;
	}
}

function mousePressed() {
	player.attack();
}

// 	let isFull = fullscreen();
// 	fullscreen(!isFull);
// }

function keyReleased() {
	if (keyCode === 87) { //w
		player.hasJumpedOnce = false;
	}
}