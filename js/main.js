
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

let bam;
let showDebug = true;

//load files
function preload() {
	textureHandler = new TextureHandler();
	textureHandler.loadAni("genga", "textures/gengar-walk", "gengar-walk");
	//textureHandler.loadImage("back", "textures/library.png");

	bam = loadSound("sounds/BAMM.wav")
}

let level1;

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();

	// eventHandler.addCollisionListener(this);
	physicsHandler = new PhysicsHandler();
	eventHandler = new EventHandler();

	player = new Player(textureHandler.getAni("genga"));
	player.setPos(400, 200);
	physicsHandler.addCollidable(player);

	camera = new CameraController(player);
	camera.setPos(0, 300);

	level1 = new Entrance();
	level1.start(player)
}

function draw() {
	movePlayer();
	physicsHandler.applyPhysics();
	render();
}

function render() {
	background(0);

	camera.focus();
	//image(textureHandler.getImage("back"), 0, 0);

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


const acceleration = 0.2;
const maxSpeed = 5;

function onDeath() {
	level1.rewind();
}

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
			level1.rewind(player);
			break;
	}
	if (keyCode === 87) { //w
		player.hasJumpedOnce = false;
	}
}