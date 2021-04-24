
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
let showDebug = true;

let camera;
let player;

let bam;

//load files
function preload() {
	textureHandler = new TextureHandler();
	//textureHandler.loadImage("back", "textures/library.png");
	textureHandler.loadAni("genga", "textures/gengar-walk", "gengar-walk");

	bam = loadSound("sounds/BAMM.wav")
}

let level1;

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();

	physicsHandler = new PhysicsHandler();

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
			level1.reset();
			level1.start(player);
			break;
	}
	if (keyCode === 87) { //w
		player.hasJumpedOnce = false;
	}
}