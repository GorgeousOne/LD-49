class Trigger extends Collidable {

	constructor(width, height, callback, isPassable = true, canCollide = true, hasGravity = false) {
		super(width, height, isPassable, canCollide, hasGravity);
		this.callback = callback;
	}

	activate() {
		this.callback()
	}

	getCopy() {
		let copy = new Trigger(this.w(), this.h(), this.callback, this.isPassable, this.hasGravity);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}