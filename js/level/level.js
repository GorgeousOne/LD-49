class Level {

	constructor(playerSpawn) {
		this.collidables = [];
		this.copies = [];
		this.playerSpawn = playerSpawn;
	}

	addCollidable(collidable) {
		this.collidables.push(collidable);
	}

	start(player) {
		player.setPos(this.playerSpawn.x, this.playerSpawn.y);
		player.velocity.set(0, 0);

		this.collidables.forEach(element => {
			let copy = element.getCopy();
			physicsHandler.addCollidable(copy);
			this.copies.push(copy);
		})
	}

	reset() {
		this.copies.forEach(element => physicsHandler.removeCollidable(element))
		this.copies = []
	}
}