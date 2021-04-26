class Player extends Collidable {

	constructor(walkingAni) {
		super(12, 47, true, true, true);
		this.isMirrored = false;
		this.hasJumpedOnce = false;
		this.walkingAni = walkingAni;

		this.isWalking = false;
		this.wasWalking = false;
		this.walkingStart = 0;
		this.dmgCooldown = new Timer(1500);

		this.sword = new Sword(50, this.h());
		this.facing = 1;
		this.hitCooldown = new Timer(250);
		// physicsHandler.addCollidable(this.sword);
	}

	setMirrored(bool) {
		this.isMirrored = bool;
	}

	walk(acceleration, maxSpeed) {
		this.isWalking = true;
		this.facing = Math.sign(acceleration);

		//accelerate faster when turning around
		if (this.facing !== Math.sign(this.velocity.x)) {
			acceleration *= 3;
		}
		this.velocity.x = constrain(this.velocity.x + acceleration, -maxSpeed, maxSpeed);
		this.setMirrored(this.facing === -1);

		if (!this.wasWalking) {
			this.walkingStart = 0;
		}
		// this.sword.swing(this.hitbox, this.facing)
	}

	attack() {
		if (!this.hitCooldown.isRunning()) {
			this.sword.swing(this.hitbox, this.facing);
			jumpSound.play();
			this.hitCooldown.start();
		}
	}

	updateX(friction, ariFriction) {
		super.updateX(this.isWalking ? 1 : friction);
	}

	updateY() {
		let wasInAir = !this.isOnGround;
		let lastVelY = this.velocity.y;

		super.updateY();

		if (wasInAir && this.isOnGround && lastVelY / gravity >= 40) {
			camera.shake(5, 250);
		}
	}

	/**
	 * jumps by approximating the velocity needed to reach given height
	 */
	jump(height) {
		if (!this.isOnGround || this.hasJumpedOnce) {
			return;
		}

		let newVelY = 0;

		while (height > 0) {
			height += newVelY;
			newVelY -= gravity;
		}
		this.velocity.y = newVelY;
		this.hasJumpedOnce = true;
		jumpSound.play();
	}

	display() {
		push();
		translate(this.pos.x + this.hitbox.size.x / 2, this.pos.y + this.hitbox.size.y / 2);

		if (this.isMirrored) {
			scale(-1, 1);
		}
		let timeWalked = this.isOnGround && this.isWalking ? Date.now() - this.walkingStart : 0;
		let currentImg = this.walkingAni.getFrame(timeWalked);

		//dmg blink
		if (!this.dmgCooldown.isRunning() || Date.now() % 100 < 50) {
			image(currentImg, -currentImg.width / 2, -currentImg.height / 2);
		}
		pop();

		this.wasWalking = this.isWalking;
		this.isWalking = false;
	}
}

class Sword extends Collidable {
	constructor(width , height) {
		super(width, height, true, false, false);
	}

	swing(hitbox, dir) {
		let x = dir === 1 ? hitbox.getBoundX(dir) - hitbox.size.x : hitbox.getBoundX(dir) - this.w();
		let y = hitbox.minY();
		this.setPos(x, y);
		for (let thing of physicsHandler.getCollisions(this)) {
			eventHandler.callCollisionEvent(this, thing);
		}
	}
}