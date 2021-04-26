const bookSpeed = 3;

class Book extends Drawable {

	constructor(spawnX, spawnY) {
		super(textureHandler.get("book"), true, false, true);
		this.isMonster = true;
		this.rotation = 0;
		this.spawnPos = createVector(spawnX, spawnY);

	}

	spawn() {
		this.velocity.set(0, 0);
		this.setPos(this.spawnPos.x, this.spawnPos.y);
		physicsHandler.addCollidable(this);
		bookSound.play();
	}

	updateY() {
		if (this.pos.y > 400) {
			removeMonster(this);
		}
		this.velocity.y = constrain(this.velocity.y, -bookSpeed, bookSpeed);
		super.updateY();
	}
}