
class Book extends Drawable {

	constructor(speed) {
		super(textureHandler.get("book"), true, false, true);
		this.isMonster = true;
		this.rotation = 0;
		this.velocity.x = speed;
	}

	spawn(x, y) {
		this.setPos(x, y);
		physicsHandler.addCollidable(this);
	}

	updateY() {
		if (this.pos.y > 400) {
			removeMonster(this);
		}
		this.velocity.y = constrain(this.velocity.y, -3, 3);
		super.updateY();
	}
}