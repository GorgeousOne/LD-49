class Lifebar {

	constructor(heartCount) {
		this.heartCount = heartCount;
		this.container = textureHandler.get("heart");
	}

	setHearts(count) {
		this.heartCount = count;
	}

	damage() {
		this.heartCount--;
		if (this.heartCount <= 0) {
			console.log("DEATH!!!")
		}
	}

	display() {
		let padding = 3;
		for (let i = 0; i < this.heartCount; ++i) {
			let relX = i * (this.container.width + padding);
			image(this.container, camera.minX() + padding + relX, camera.minY() + padding)
		}
	}
}