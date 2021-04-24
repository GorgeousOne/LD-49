class Level {

	constructor(playerSpawn) {
		this.collidables = [];
		this.playerSpawn = playerSpawn;

		this.gameState = [];

		this.checkpointState = this.collidables;
		this.checkpointSpawn = playerSpawn;
	}

	addCollidable(collidable) {
		this.collidables.push(collidable);
	}

	start() {
		player.setPos(this.checkpointSpawn.x, this.checkpointSpawn.y);
		player.velocity.set(0, 0);

		this.checkpointState.forEach(element => {
			let copy = element.getCopy();
			physicsHandler.addCollidable(copy);
			this.gameState.push(copy);
		})
	}

	setCheckPoint() {
		this.checkpointSpawn = player.pos.copy();

		this.collidables = [];
		this.collidables.forEach(element => {
			this.checkpointState.push(element.getCopy());
		})
	}

	rewind() {
		console.log(this.constructor.name);
		this.end();
		this.start(this.checkpointSpawn, this.checkpointState);
	}

	end() {
		this.gameState.forEach(element => physicsHandler.removeCollidable(element))
		this.gameState = []
	}
}