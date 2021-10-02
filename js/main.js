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
let showDebug = false;

let updateHandler;
let inputHandler;
let talkingHandler;
let displayHandler;
let levelHandler;

//load files
function preload() {
	loadImage('js/pixeltext/pixel-font.min.png', img => loadLetters(img));
	textureHandler = new TextureHandler();
}

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	noSmooth();

	camera = new CameraController();
	windowResized();

	updateHandler = new UpdateHandler(1);
	displayHandler = new DisplayHandler(color(16, 17, 26));

	inputHandler = new InputHandler();
	physicsHandler = new PhysicsHandler();
	talkingHandler = new TalkingHandler(displayHandler);
	levelHandler = new LevelHandler();
	// let playerController = new PlayerController(player);

	// updateHandler.addListener(playerController);
	updateHandler.addListener(physicsHandler);
	updateHandler.addListener(displayHandler);

	inputHandler.addListener(talkingHandler);
	// inputHandler.addListener(playerController);

	setupLevels();
	levelHandler.startNextLevel();
}

function setupLevels() {
	levelHandler.addLevel(new StartLevel(displayHandler, camera));
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