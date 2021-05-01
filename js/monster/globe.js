class Globe extends Drawable {

	constructor(spawnX, spawnY) {
		super(textureHandler.get("globe"), true, true, true);
		this.isMonster = true;
		this.rotation = 0;
		this.spawnPos = createVector(spawnX, spawnY);
		this.wasOnGround = false;

		this.hitbox.size.set(29, 34);
		this.hitbox.translate(5, 5);
	}

	spawn() {
		this.setPos(this.spawnPos.x, this.spawnPos.y);
		this.velocity.set(0, 0);
		this.facing = -Math.sign(this.pos.x);
		physicsHandler.addCollidable(this);
	}

	updateY() {
		this.velocity.y = constrain(this.velocity.y, -5, 5);
		super.updateY();

		if (this.pos.y > 400) {
			removeMonster(this);
		}
	}

	updateX(friction) {
		if (this.isOnGround) {
			if (!this.wasOnGround) {
				globeBonk.play();
				this.wasOnGround = true;
			}
			this.velocity.x = this.facing * 2;
		}
		super.updateX(1);
	}

	display() {
		this.rotation += PI / 32 * this.facing;
		let imgWidth = this.texture.width;
		let imgHeight = this.texture.height;

		push();
		translate(this.pos.x + imgWidth / 2, this.pos.y + imgHeight / 2);

		rotate(this.rotation);
		image(this.texture, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
		pop();
	}
}