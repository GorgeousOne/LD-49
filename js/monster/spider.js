const ropingSpeed = 1.5;

class Spider extends Drawable {

	constructor(spawnX, spawnY) {
		super(textureHandler.get("spider-hang"), true, false);
		this.hang = textureHandler.get("spider-hang");
		this.walk = textureHandler.get("spider-walk");

		this.hitbox.size.set(11, 10);
		this.hitbox.translate(6, 0);
		this.ropePos = null;

		this.ropingTimer = new Timer(2000);
		this.cobwebTimer = new Timer(500);

		this.isMonster = true;
		this.spawnPos = createVector(spawnX, spawnY);
	}

	spawn() {
		this.canCollide = false;
		this.hasGravity = false;
		this.texture = this.hang;

		this.setPos(this.spawnPos.x, this.spawnPos.y);
		this.ropePos = this.pos.copy();
		this.ropingTimer.start();
		physicsHandler.addCollidable(this);
	}

	display() {
		if (this.ropingTimer.hasStarted) {

			if (this.ropingTimer.isOver()) {
				this.canCollide = true;
				this.hasGravity = true;
				this.texture = this.walk;
				this.cobwebTimer.start();
			} else {
				this.ropeDown();
			}
		}

		if (this.cobwebTimer.isOver()) {
			let speed = 2 * Math.sign(player.pos.x - this.pos.x);
			let web = new Cobweb(speed).setPos(this.pos.x, this.pos.y);

			physicsHandler.addCollidable(web);
			addMonster(web);
			this.cobwebTimer.duration = 4000;
			this.cobwebTimer.start();
		}
		super.display();
	}

	ropeDown() {
		this.translate(0, ropingSpeed);

		push();
		strokeWeight(1);
		stroke(200);
		translate(this.texture.width / 2, 0);
		line(this.ropePos.x, this.ropePos.y, this.pos.x, this.pos.y + this.texture.height / 2);
		pop();
	}
}

class Cobweb extends Drawable {

	constructor(velocity) {
		super(textureHandler.get("cobweb"), true, true);
		spitSound.play();
		this.velocity.x = velocity;
		this.isMirrored = velocity < 0;
		this.isMonster = true;
	}
}