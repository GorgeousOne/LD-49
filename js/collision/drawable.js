
class Drawable extends Collidable {

	constructor(scale, texture, isPassable = false, canCollide = true, hasGravity = false) {
		super(texture.width * scale, texture.height * scale, isPassable, canCollide, hasGravity);
		this.scale = scale;
		this.texture = texture;
		this.isMirrored = false;
	}

	display() {
		let imgWidth = this.texture.width * this.scale;
		let imgHeight = this.texture.height * this.scale;

		push();
		translate(this.pos.x + imgWidth/2, this.pos.y + imgHeight/2);

		if (this.isMirrored) {
			scale(-1, 1);
		}
		image(this.texture, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
		pop();
	}

	getCopy() {
		let copy = new Drawable(this.scale, this.texture, this.isPassable, this.hasGravity);
		copy.setPos(this.pos.x, this.pos.y);
		copy.velocity.set(this.velocity);
		copy.isMirrored = this.isMirrored;
		return copy;
	}
}