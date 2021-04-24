
class Trigger extends Collidable{

	constructor(width, height, callback, isSolid = true, hasGravity) {
		super(width, height, isSolid, hasGravity);
		this.callback = callback;
	}

	activate() {
		this.callback()
	}

	getCopy() {
		let copy = new Trigger(this.w(), this.h(), this.callback, this.isSolid, this.hasGravity);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}