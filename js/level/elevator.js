class Elevator extends Level {

	constructor() {
		super(createVector(0, -player.h()));

		this._createBackground();
		this._createShelves();
		this._createWalls();

		this.lift = new Lift(2);
		this.lift.setPos(-this.lift.w() / 2, 0);
		this.addCollidable(this.lift);

		let fallTrigger = new Trigger(1000, 10, () => {
			lifebar.damage();
			player.setPos(0, -player.h());
		}).setPos(-500, 500);
		this.addCollidable(fallTrigger);
	}

	_createBackground() {
		this.backSpeed = 0.2;
		this.backs = [];
		this.backImg = textureHandler.get("backwall");

		this.backHeight = this.backImg.height;
		let backWidth = this.backImg.width;
		this.backCount = Math.ceil((camera.maxY() - camera.minY()) / this.backHeight) + 2;

		for (let i = 0; i < this.backCount; ++i) {
			let back = new Drawable(this.backImg, true, false).setPos(-backWidth / 2, -width / 2 + i * this.backHeight);
			this.addCollidable(back);
			if (i % 2 === 0) {
				back.isMirrored = true;
			}
		}
	}

	_createShelves() {
		this.shelfSpeed = 0.5;
		this.shelves = [];
		this.shelfImg = textureHandler.get("shelf");

		this.shelfHeight = this.shelfImg.height;
		let shelfWidth = this.shelfImg.width;
		this.shelfCount = Math.ceil((camera.maxY() - camera.minY()) / this.shelfHeight) + 2;

		for (let i = 0; i < this.shelfCount; ++i) {
			let shelf = new Drawable(this.shelfImg, true, false).setPos(-shelfWidth / 2, -width / 2 + i * this.shelfHeight);
			this.addCollidable(shelf);
			if (i % 2 === 0) {
				shelf.isMirrored = true;
			}
		}
	}

	_createWalls() {
		this.walls = [];
		this.wallImg = textureHandler.get("wall");

		let wallWidth = this.wallImg.width;
		this.wallHeight = this.wallImg.height;
		this.wallCount = Math.ceil((camera.maxY() - camera.minY()) / this.wallHeight) + 2; //+2 for assurance

		for (let i = 0; i < this.wallCount; ++i) {
			let leftWall = new Drawable(this.wallImg).setPos(-240, -width / 2 + i * this.wallHeight);
			let rightWall = new Drawable(this.wallImg).setPos(240 - wallWidth, -width / 2 + i * this.wallHeight);
			rightWall.isMirrored = true;

			this.addCollidable(leftWall);
			this.addCollidable(rightWall);
		}
	}

	start() {
		super.start();

		if (!this.musicLoop) {
			this.musicLoop = new Timer(1000 * 85);
			this.musicLoop.start();
			music.play();
		}

		this.walls = [];
		this.back = [];

		for (let collidable of this.gameState) {
			if (collidable instanceof Lift) {
				camera.target = collidable;
				camera.followTargetY = true;
				camera.followTargetX = false;
				camera.setOffset(0, -0.33);
				camera.setPos(0, 0);
			} else if (collidable.texture === this.wallImg) {
				this.walls.push(collidable);
			} else if (collidable.texture === this.backImg) {
				this.backs.push(collidable);
				physicsHandler.removeCollidable(collidable);
			}else if(collidable.texture === this.shelfImg){
				this.shelves.push(collidable);
				physicsHandler.removeCollidable(collidable);
			}
		}
	}

	update() {
		if (this.musicLoop.isOver()) {
			this.musicLoop.start();
			music.play();
		}

		for (let wall of this.walls) {
			wall.translate(0, -this.lift.speed);
			if (wall.hitbox.maxY() < camera.minY()) {
				wall.translate(0, this.wallCount * this.wallHeight);
			}
		}

		for (let back of this.backs) {
			back.translate(0, -this.lift.speed * this.backSpeed);
			if (back.hitbox.maxY() < camera.minY()) {
				back.translate(0, this.wallCount * this.wallHeight);
			}
		}
		for (let shelf of this.shelves) {
			shelf.translate(0, -this.lift.speed * this.shelfSpeed);
			if (shelf.hitbox.maxY() < camera.minY()) {
				shelf.translate(0, this.wallCount * this.wallHeight);
			}
		}
	}
}