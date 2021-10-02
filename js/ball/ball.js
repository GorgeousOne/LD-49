
class Ball {

	constructor(x, y, r, fill, mass = 1, isRigid = false) {
		this._pos = createVector(x, y);
		this._collider = new CircleCollider(x, y,  r);
		this._fill = fill;
		this._mass = mass;
		this._isRigid = isRigid;
		this._velocity = createVector();
	}

	setVelocity(vec) {
		this._velocity.set(vec);
	}

	addVelocity(vec) {
		this._velocity.add(vec);
	}

	translate(vec) {
		this._pos.add(vec);
		this._collider.translate(vec);
	}

	move() {
		if (!this._isRigid) {
			this._pos.add(this._velocity);
			this._collider.translate(this._velocity);
		}
	}

	display() {
		push();
		fill(this._fill);
		noStroke();

		ellipse(
			this._pos.x,
			this._pos.y,
			this._collider._radius*2,
			this._collider._radius*2);
		pop();
	}
}