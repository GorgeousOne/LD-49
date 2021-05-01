const bookSpeed = 3;

class Book extends Drawable {

	constructor(spawnX, spawnY) {
		super(textureHandler.get("book"), true, false, true);
		this.isMonster = true;
		this.rotation = 0;
		this.spawnPos = createVector(spawnX, spawnY);

		this.hitbox.size.set(21, 19);
		this.hitbox.translate(4, 3);
	}

	spawn() {
		this.velocity.set(0, 0);
		this.setPos(this.spawnPos.x - this.texture.width/2, this.spawnPos.y);
		physicsHandler.addCollidable(this);
		bookSound.play();
	}

	updateY() {
		this.velocity.y = constrain(this.velocity.y, -bookSpeed, bookSpeed);
		super.updateY();

		if (this.pos.y > 400) {
			removeMonster(this);
		}
	}
}