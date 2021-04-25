class Level {

	constructor(playerSpawn) {
		this.collidables = [];
		this.playerSpawn = playerSpawn;

		this.gameState = [];

		this.checkpointState = this.collidables;
		this.checkpointSpawn = playerSpawn;
	}

	update() {}

	addCollidable(collidable) {
		this.collidables.push(collidable);
	}

	start() {
		player.setPos(this.checkpointSpawn.x, this.checkpointSpawn.y);
		player.velocity.set(0, 0);

		this.checkpointState.forEach(element => {
			let copy = element.getCopy();

			if (copy instanceof Drawable) {
				addDrawable(copy);
			}

			physicsHandler.addCollidable(copy);
			this.gameState.push(copy);
		})
	}

	setCheckPoint() {
		this.checkpointSpawn = player.pos.copy();
		this.checkpointState = [];

		this.collidables.forEach(element => {
			this.checkpointState.push(element.getCopy());
		})
	}

	rewind() {
		this.end();
		this.start(this.checkpointSpawn, this.checkpointState);
	}

	end() {
		this.checkpointSpawn = this.playerSpawn;
		this.gameState.forEach(element => {
			physicsHandler.removeCollidable(element);
			removeDrawable(element);
		});
		this.gameState = []
	}
}