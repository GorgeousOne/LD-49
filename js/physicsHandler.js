let gravity = 1;

class PhysicsHandler extends UpdateListener {

	constructor() {
		super();
		this._balls = [];
	}

	addBall(ball) {
		if (!this._balls.includes(ball)) {
			this._balls.push(ball);
		}
	}

	removeBall(ball) {
		if (this._balls.includes(ball)) {
			let i = this._balls.indexOf(ball);
			this._balls.splice(i, 1);
		}
	}

	onFixedUpdate(dTime) {
		this._applyPhysics();
	}

	_applyPhysics() {
		for (let i = 0; i < this._balls.length; ++i) {
			for (let j = 0; j < this._balls.length; ++j) {
				if (j === i) {
					continue;
				}
				let ball = this._balls[i];
				ball.addVelocity(this._getPull(ball, this._balls[j]));
			}
		}
		for (let ball of this._balls) {
			ball.move();
		}
		// for (let i = 0; i < this._balls.length - 1; ++i) {
		// 	for (let j = i + 1; j < this._balls.length; ++j) {
		// 		let ball = this._balls[i];
		// 		let other = this._balls[j];
		// 		let overlap = ball._collider.getIntersection(other._collider);
		//
		// 		if (overlap.mag() <= 0) {
		// 			continue;
		// 		}
		// 		let massRatio = ball._mass / other._mass;
		//
		// 		let ballSpeed = ball._velocity.mag();
		// 		let otherSpeed = other._velocity.mag();
		// 		let totalSpeed = ballSpeed + otherSpeed;
		//
		// 		ball.translate(overlap.copy().mult(-ballSpeed / totalSpeed));
		// 		other.translate(overlap.copy().mult(otherSpeed / totalSpeed));
		// 		let ballForce = ball._velocity.copy().mult(massRatio);
		// 		let otherForce = other._velocity.copy().mult(1 / massRatio);
		//
		// 		console.log(ballForce.mag(), otherForce.mag());
		// 		// console.log();
		// 		ball.addVelocity(otherForce);
		// 		other.addVelocity(ballForce);
		// 	}
		// }
	}

	_getPull(ball, other) {
		let dist = other._pos.copy().sub(ball._pos);
		let radius = dist.mag();

		let pull = gravity * other._mass / (radius * radius);
		return dist.normalize().mult(pull);
	}

	_getReflectDir(ball, intersectVec) {
		let normal = intersectVec.copy().normalize();
		let vel = ball._velocity.copy();
		return vel.sub(normal.mult(2 * vel.dot(normal)));
	}
	// getCollisions(ball) {
	// 	let objects = [];
	//
	// 	for (let other of this._balls) {
	// 		if (other === ball) {
	// 			continue;
	// 		}
	// 		if (ball.hitbox.intersects(other.hitbox)) {
	// 			objects.push(other);
	// 		}
	// 	}
	// 	return objects;
	// }
}
