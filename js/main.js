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

let showDebug = false;

let levels;
let currentLevel;

let drawables;
let monsters;

let music;
let jumpSound;
let spitSound;

//load files
function preload() {
	music = loadSound("sounds/sad.mp3");
	jumpSound = loadSound("sounds/jump.mp3");
	spitSound = loadSound("sounds/spit.mp3");

	textureHandler = new TextureHandler();
	textureHandler.loadAni("kid", "textures/kid", "kid-walk");
	textureHandler.loadImage("heart", "textures/heart.png");
	textureHandler.loadImage("wall", "textures/wall.png");
	textureHandler.loadImage("backwall", "textures/backwall.png");

	textureHandler.loadImage("platform", "textures/platform.png");
	textureHandler.loadImage("globe", "textures/globe2.png");
	textureHandler.loadImage("book", "textures/book.png");
	textureHandler.loadImage("spider-hang", "textures/spider-hang.png");
	textureHandler.loadImage("spider-walk", "textures/spider.png");
	textureHandler.loadImage("cobweb", "textures/cobweb.png");
	// music.volume(0.4);
	// jumpSound.volume(0.5);
}

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

	lifebar = new Lifebar(3);
	addDrawable(lifebar);

	levels = [];
	levels.push(new Entrance());
	levels.push(new Elevator(music));

	currentLevel = 0;
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

	if (showDebug) {
		for (let thing of physicsHandler.collidables) {
			thing.hitbox.display();
		}
	}

	fill(255);
	// text(round(camera.minX()) + "," + round(camera.minY()), camera.minX(), camera.minY() + 10);
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
		case 32: //spacebar
			let spider = new Spider();
			addMonster(spider);
			spider.spawn(player.pos.x, -300);
			break;
		case 66: //b
			let globe = new Globe();
			addMonster(globe);
			globe.spawn(player.pos.x, -300);
			break;

		case 78: //n
			let book = new Book();
			addMonster(book);
			book.spawn(player.pos.x, -300);
			break;

		case 81: //q
			showDebug = !showDebug;
			break;
		case 82: //r
			levels[currentLevel].rewind(player);
			for (let monster of monsters) {
				removeDrawable(monster);
				physicsHandler.removeCollidable(monster);
			}
			monsters = [];
			break;
	}
}

// function mousePressed() {
// 	let isFull = fullscreen();
// 	fullscreen(!isFull);
// }

function keyReleased() {
	if (keyCode === 87) { //w
		player.hasJumpedOnce = false;
	}
}