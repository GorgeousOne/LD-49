
class Lift extends Drawable {

	constructor(scale, texture) {
		super(scale, texture);
		console.log("yes ay ay")
	}

	display() {
		this.translate(0, 5);
		super.display();
	}

	getCopy() {
		let copy = new Lift(this.scale, this.texture);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}