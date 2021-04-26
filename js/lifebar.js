class Lifebar {

	constructor(heartCount) {
		this.heartCount = heartCount;
		this.container = textureHandler.get("heart");
	}

	setHearts(count) {
		this.heartCount = count;
	}

	damage() {
		if (player.dmgCooldown.isRunning()) {
			return
		}

		camera.shake(5, 250);
		this.heartCount--;
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