
class Player extends Collidable {

	constructor(walkingAni) {
		super(20, 20, true, true, true);
		this.isMirrored = false;
		this.hasJumpedOnce = false;
		this.walkingAni = walkingAni;

		this.isWalking = false;
		this.wasWalking = false;
		this.walkingStart = 0;
	}

	setMirrored(bool) {
		this.isMirrored = bool;
	}

	walk(acceleration, maxSpeed) {
		this.isWalking = true;
		let walkingDir = Math.sign(acceleration);

		//accelerate faster when turning around
		if (walkingDir !== Math.sign(this.velocity.x)) {
			acceleration *= 3;
		}
		this.velocity.x = constrain(this.velocity.x + acceleration, -maxSpeed, maxSpeed);
		this.setMirrored(walkingDir === 1);

		if (!this.wasWalking) {
			this.walkingStart = 0;
		}
	}

	updateX(friction, ariFriction) {
		super.updateX(this.isWalking ? 1 : friction);
	}

	updateY() {
		let wasInAir = !this.isOnGround;
		let lastVelY = this.velocity.y;

		super.updateY();

		if(wasInAir && this.isOnGround && lastVelY / gravity >= 40) {
			camera.shake(5, 250);
		}
	}

	/**
	 * jumps by approximating the velocity needed to reach given height
	 */
	jump(height) {
		if (!this.isOnGround || this.hasJumpedOnce)
			return;

		let newVelY = 0;

		while (height > 0) {
			height += newVelY;
			newVelY -= gravity;
		}
		this.velocity.y = newVelY;
		this.hasJumpedOnce = true;
	}

	display() {
		push();
		translate(this.pos.x + this.hitbox.size.x / 2, this.pos.y + this.hitbox.size.y / 2);

		if (this.isMirrored) {
			scale(-1, 1);
		}
		let timeWalked = this.isOnGround && this.isWalking ? Date.now() - this.walkingStart : 0;
		let currentImg = this.walkingAni.getFrame(timeWalked);
		image(currentImg, -currentImg.width / 2, -currentImg.height / 2);
		pop();

		this.wasWalking = this.isWalking;
		this.isWalking = false;
	}
}