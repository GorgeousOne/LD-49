Array.prototype.removeIf = function (functor) {
	let i = this.length;
	while (i--) {
		if (functor(this[i], i)) {
			this.splice(i, 1);
		}
	}
};

let textureHandler;
let physicsHandler;
let eventHandler;

let camera;
// let player;
// let lifebar;

// let levels;
// let currentLevel;

// let drawables;
// let monsters;

// let music;
// let jumpSound;
// let spitSound;
// let bookSound;
// let globeBonk;
// let successSound;

// let swordSound;

// let monsterQueue;
let showDebug = false;

let updateHandler;
let inputHandler;
let talkingHandler;
let displayHandler;

//load files
function preload() {
	loadImage('js/pixeltext/pixel-font.min.png', img => loadLetters(img));
	// monsterQueue = loadStrings("js/monster-queue.txt");

	// music = loadSound("sounds/sad.mp3");
	// jumpSound = loadSound("sounds/jump.wav");
	// spitSound = loadSound("sounds/spit.wav");
	// bookSound = loadSound("sounds/book-slap.wav");
	// swordSound = loadSound("sounds/slash2.wav");
	// globeBonk = loadSound("sounds/globe-bonk.wav");
	// successSound = loadSound("sounds/success.mp3");

	textureHandler = new TextureHandler();
	// textureHandler.loadImage("grandpa", "textures/grandpa.png");
	// textureHandler.loadImage("grandpa-smile", "textures/grandpa-smile.png");

	// textureHandler.loadAni("kid", "textures/kid", "kid-walk");
	// textureHandler.loadAni("kid-hit", "textures/kid", "kid-hit");

	// textureHandler.loadImage("heart", "textures/heart.png");
	// textureHandler.loadImage("wall", "textures/wall.png");
	// textureHandler.loadImage("backwall", "textures/backwall.png");
	// textureHandler.loadImage("controls", "textures/controls.png");
	// textureHandler.loadImage("shelf", "textures/shelf.png");

	// textureHandler.loadImage("platform", "textures/platform.png");
	// textureHandler.loadImage("globe", "textures/globe2.png");
	// textureHandler.loadImage("book", "textures/book.png");
	// textureHandler.loadImage("spider-hang", "textures/spider-hang.png");
	// textureHandler.loadImage("spider-walk", "textures/spider.png");
	// textureHandler.loadImage("cobweb", "textures/cobweb.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	noSmooth();

	// drawables = [];
	// monsters = [];

	camera = new CameraController();
	windowResized();


	// player = new Player(textureHandler.getAni("kid"));
	// player.hasGravity = false;
	// lifebar = new Healthbar(5);


	updateHandler = new UpdateHandler(20);
	displayHandler = new DisplayHandler(color(16, 17, 26));

	inputHandler = new InputHandler();
	physicsHandler = new PhysicsHandler();
	talkingHandler = new TalkingHandler(displayHandler);
	// let playerController = new PlayerController(player);

	// updateHandler.addListener(playerController);
	updateHandler.addListener(physicsHandler);
	updateHandler.addListener(displayHandler);

	inputHandler.addListener(talkingHandler);
	// inputHandler.addListener(playerController);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	let isWide = width >= (height * 16 / 9);
	camera.zoom = isWide ? height / 1080 : width / 1920;
	camera.zoom *= 3;
}

function draw() {
	updateHandler.callFixedUpdates();
	updateHandler.callRedraw();
}

// function resetLevel() {
// 	levels[currentLevel].rewind(player);
// 	for (let monster of monsters) {
// 		removeDrawable(monster);
// 		physicsHandler.removeCollidable(monster);
// 	}
// 	monsters = [];
// }

// function nextLevel() {
// 	levels[currentLevel].end();
// 	currentLevel++;
// 	levels[currentLevel].start();
// }

function keyPressed() {
	inputHandler.callKeyPress(keyCode);
}

function keyReleased() {
	inputHandler.callKeyRelease(keyCode);
}

function mousePressed() {
	inputHandler.callMousePress(mouseButton);
}

function mouseReleased() {
	inputHandler.callMouseRelease(mouseButton);
}