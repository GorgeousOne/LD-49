class Elevator extends Level {

	constructor(mobQueue) {
		super(createVector(0, -player.h()));

		this._loadMonsters(mobQueue);
		this._createBackground();

		this.controlsImg = textureHandler.get("controls");
		let controls = new Drawable(this.controlsImg, true, false);
		controls.setPos(-150, -50	);
		this.addCollidable(controls);

		this._createShelves();
		this._createWalls();

		this.lift = new Lift(2);
		this.lift.setPos(-this.lift.w() / 2, 0);
		this.addCollidable(this.lift);

		let fallTrigger = new Trigger(1000, 10, () => {
			lifebar.damage();
			player.setPos(0, -player.h());
		});
		fallTrigger.setPos(-500, 500);
		this.addCollidable(fallTrigger);

		this.checkpointLiftHeight = 0;
	}

	_loadMonsters(textFile) {
		this.checkpointMobs = new Map();
		console.log(textFile);
		let level = 0;

		for (let i = 0; i < textFile.length; i++) {
			let line = textFile[i].trim();

			if (line.startsWith("#")) {
				continue;
			}
			let info = textFile[i].split(' ');

			if (info.length < 3) {
				continue
			}
			level += parseInt(info[0]);
			let x = parseInt(info[1]);
			console.log("added " + info[2]);

			switch (info[2]) {
				case "spider":
					this.checkpointMobs.set(level, new Spider(x, -300));
					break;
				case "book":
					this.checkpointMobs.set(level, new Book(x, -300));
					break;
				case "globe":
					this.checkpointMobs.set(level, new Globe(x, -300));

					break;
				default:
					break;
			}
		}
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
		player.hasGravity = true;
		physicsHandler.addCollidable(player);

		this.gameStateMobs = new Map(this.checkpointMobs);
		this.liftHeight = this.checkpointLiftHeight;

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
			} else if (collidable.texture === this.wallImg) {
				this.walls.push(collidable);
			} else if (collidable.texture === this.backImg) {
				this.backs.push(collidable);
				physicsHandler.removeCollidable(collidable);
			} else if (collidable.texture === this.shelfImg) {
				this.shelves.push(collidable);
				physicsHandler.removeCollidable(collidable);
			}else if (collidable.texture === this.controlsImg) {
				this.keys = collidable;
			}
		}
	}

	setCheckPoint() {
		super.setCheckPoint();
		this.checkpointLiftHeight = this.liftHeight;
		this.checkpointMobs = this.gameStateMobs;
	}

	update() {
		for (let height of this.gameStateMobs.keys()) {
			if (height > this.liftHeight) {
				let monster = this.gameStateMobs.get(height);
				console.log(monster.constructor.name);
				monster.spawn();
				addMonster(monster);
				this.gameStateMobs.delete(height);
			}
		}

		if (this.musicLoop.isOver()) {
			this.musicLoop.start();
			music.play();
		}

		this.keys.translate(0, -this.lift.speed * this.shelfSpeed);

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
		this.liftHeight -= this.lift.speed;
		push();
		fill(255);
		stroke(255);
		text(Math.floor(this.liftHeight / 10) + "|-850", camera.maxX() - 80, camera.minY() + 15);
		pop();

		if (this.liftHeight <= -8500) {
			music.stop();
			nextLevel();
		}
	}
}