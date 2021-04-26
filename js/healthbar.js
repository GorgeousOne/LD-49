class Healthbar {

	constructor(maxHealth) {
		this.maxHealth = maxHealth;
		this.heartCount = maxHealth;
		this.container = textureHandler.get("heart");
	}

	setHearts(count) {
		this.heartCount = count;
	}

	damage() {
		if (player.dmgCooldown.isRunning()) {
			return;
		}

		camera.shake(5, 250);
		this.heartCount--;

		if (this.heartCount <= 0) {
			levels[currentLevel].rewind();
			this.heartCount = this.maxHealth;
		}
		player.dmgCooldown.start();
		player.velocity.x = Math.sign(player.velocity.x) * -3;
	}

	display() {
		let padding = 3;
		for (let i = 0; i < this.heartCount; ++i) {
			let relX = i * (this.container.width + padding);
			image(this.container, camera.minX() + padding + relX, camera.minY() + padding)
		}
	}
}