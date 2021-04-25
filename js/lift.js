class Lift extends Drawable {

	constructor(scale, texture, speed) {
		super(scale, texture);
		this.speed = speed;
	}

	// display() {
	// 	this.translate(0, this.speed);
	//
	// 	for (let collidable of physicsHandler.collidables) {
	// 		if (this === collidable.lastGround) {
	// 			collidable.translate(0, this.speed);
	// 		}
	// 	}
	//
	// 	super.display();
	// }

	getCopy() {
		let copy = new Lift(this.scale, this.texture);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}