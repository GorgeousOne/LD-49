
class Drawable extends Collidable {

	constructor(scale, texture, isSolid = true, hasGravity = false) {
		super(texture.width * scale, texture.height * scale, isSolid, hasGravity);
		this.scale = scale;
		this.texture = texture;
	}

	display() {
		image(this.texture, this.pos.x, this.pos.y,
			this.texture.width * this.scale, this.texture.height * this.scale);
	}

	getCopy() {
		let copy = new Drawable(this.scale, this.texture, this.isSolid, this.hasGravity);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		return copy;
	}
}