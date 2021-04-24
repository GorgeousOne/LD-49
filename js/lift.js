
class Lift extends Drawable {

	constructor(scale, texture) {
		super(scale, texture);
		this.speed = 1;
	}

	display() {
		// console.log(this.pos.y);
		this.translate(0, this.speed);

		// if (player.isOnGround) {
			player.translate(0, this.speed);
		// }

		// if (player.wasOnGround) {
		//
		// }

		super.display();
	}

	getCopy() {
		let copy = new Lift(this.scale, this.texture);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}