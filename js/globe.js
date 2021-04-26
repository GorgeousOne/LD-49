
class Globe extends Drawable {

	constructor() {
		super(textureHandler.get("globe"), true, true, true);
		this.isMonster = true;
		this.rotation = 0;
	}

	spawn(x, y) {
		this.setPos(x, y);
		physicsHandler.addCollidable(this);
	}

	updateY() {
		this.velocity.y = constrain(this.velocity.y, -5, 5);
		super.updateY();
	}

	updateX(friction) {
		if (this.isOnGround) {
			this.velocity.x = 1;
		}
		super.updateX(1);
	}

	display() {
		this.rotation += PI / 32;
		let imgWidth = this.texture.width;
		let imgHeight = this.texture.height;

		push();
		translate(this.pos.x + imgWidth / 2, this.pos.y + imgHeight / 2);

		rotate(this.rotation);
		image(this.texture, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
		pop();
	}
}