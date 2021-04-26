class Drawable extends Collidable {

	constructor(texture, isPassable = false, canCollide = true, hasGravity = false) {
		super(texture.width, texture.height, isPassable, canCollide, hasGravity);
		this.texture = texture;
		this.isMirrored = false;
	}

	display() {
		let imgWidth = this.texture.width;
		let imgHeight = this.texture.height;

		push();
		translate(this.pos.x + imgWidth / 2, this.pos.y + imgHeight / 2);

		if (this.isMirrored) {
			scale(-1, 1);
		}
		image(this.texture, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
		pop();
	}

	getCopy() {
		let copy = new Drawable(this.texture, this.isPassable, this.canCollide, this.hasGravity);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		copy.isMirrored = this.isMirrored;
		return copy;
	}
}