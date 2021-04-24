
class Trigger extends Collidable{

	constructor(width, height, callback) {
		super(width, height, false);
		this.callback = callback;
	}

	activate() {
		this.callback()
	}

	getCopy() {
		let copy = new Trigger(this.hitbox.size.x, this.hitbox.size.y, this.callback);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}