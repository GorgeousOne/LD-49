class Lift extends Drawable {

	constructor(speed) {
		super(textureHandler.get("platform"));
		this.hitbox.size.x -= 8;
		this.hitbox.translate(4, 0);
		this.speed = speed;
	}

	getCopy() {
		let copy = new Lift(this.scale, this.texture);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}