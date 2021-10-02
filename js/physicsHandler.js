const gravity = 0.3;
const maxVel = 50;

const friction = 1.5;

class PhysicsHandler extends UpdateListener {

	constructor() {
		super();
		this.collidables = [];
	}

	addCollidable(collidable) {
		if (!this.collidables.includes(collidable)) {
			this.collidables.push(collidable);
		}
	}

	removeCollidable(collidable) {
		if (this.collidables.includes(collidable)) {
			let i = this.collidables.indexOf(collidable);
			this.collidables.splice(i, 1);
		}
	}

	onFixedUpdate(dTime) {
		this.applyPhysics();
	}

	applyPhysics() {
		for (let collidable of this.collidables) {
			if (collidable.hasGravity) {
				collidable.velocity.y = constrain(collidable.velocity.y + gravity, -maxVel, maxVel);
			}
			collidable.updateX(friction);
			collidable.updateY();
		}
	}

	getCollisions(collidable) {
		let objects = [];

		for (let other of this.collidables) {
			if (other === collidable) {
				continue;
			}
			if (collidable.hitbox.intersects(other.hitbox)) {
				objects.push(other);
			}
		}
		return objects;
	}
}
