
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
		this.velocity.y = constrain(this.velocity.y, -4, 4);
		super.updateY();
	}
}