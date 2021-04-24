class Collidable {

	constructor(width, height, isSolid = true, hasGravity = false) {
		this.hitbox = new Hitbox(width, height);
		this.pos = createVector();
		this.velocity = createVector();
		this.intersectings = [];
		this.isSolid = isSolid;
		this.hasGravity = hasGravity;
		this.isOnGround = false;
		this.lastGround = null;

		if (!this.isSolid) {
			this.hitbox.outline = color(0, 255, 0);
		}
	}

	setPos(x, y) {
		this.pos.set(x, y);
		this.hitbox.setPos(x, y);
		return this;
	}

	translate(dx, dy) {
		this.pos.add(dx, dy);
		this.hitbox.translate(dx, dy);
	}

	/**
	 * Applies own x velocity to itself and looks for intersections with others
	 */
	updateX(friction) {
		//makes sure that it doesnt accidentally move away from others while not in motion
		if (abs(this.velocity.x) > 0.001) {
			this._moveX(this.velocity.x);

			if (this.isOnGround) {
				this.velocity.x /= friction;
			}
		}
	}

	_moveX(dx) {
		this.translate(dx, 0);
		let facing =  Math.sign(dx);

		let collisions = physicsHandler.getCollisions(this);
		this.intersectings.removeIf(function (val) {!collisions.includes(val)});

		for (let other of collisions) {
			if (this.isSolid || other.isSolid) {
				let intersection = other.hitbox.getBoundX(-facing) - this.hitbox.getBoundX(facing);
				this.translate(intersection, 0);
				this.velocity.x = 0;
				eventHandler.callCollisionEvent(this, other);

			}else {
				if (this.intersectings.includes(other)) {
					continue;
				}
				this.intersectings.push(other);
				eventHandler.callCollisionEvent(this, other);
			}
		}
	}

	updateY() {
		if (abs(this.velocity.y) > 0.001) {
			this.isOnGround = false;
			this._moveY(this.velocity.y);
		}
	}

	_moveY(dy) {
		this.translate(0, dy);
		let facing = Math.sign(dy);

		if (facing === -1) {
			this.isOnGround = false;
			this.lastGround = null;
		}
		let collisions = physicsHandler.getCollisions(this);
		this.intersectings.removeIf(function (val) {return !collisions.includes(val)});

		for (let other of collisions) {
			if (this.isSolid && other.isSolid) {
				let intersection = other.hitbox.getBoundY(-facing) - this.hitbox.getBoundY(facing);
				this.translate(0, intersection);
				this.velocity.y = 0;

				if (!this.isOnGround && other !== this.lastGround) {
					eventHandler.callCollisionEvent(this, other);
				}

				if (facing === 1) {
					this.isOnGround = true;
					this.lastGround = other;
				}

			}else {
				if (this.intersectings.includes(other)) {
					continue;
				}
				this.intersectings.push(other);
				eventHandler.callCollisionEvent(this, other);
			}
		}
	}

	getCopy() {
		let copy = new Collidable(this.hitbox.size.x, this.hitbox.size.y, this.isSolid, this.hasGravity);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}