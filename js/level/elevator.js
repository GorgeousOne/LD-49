
class Elevator extends Level {

	constructor() {
		super(createVector(0, 0));

		this.walls = [];
		let wallWidth = textureHandler.get("wall").width * 0.25;

		for (let i = 0; i < 50; ++i) {
			let leftWall = new Drawable(0.25, textureHandler.get("wall")).setPos(-240, i * 270);
			let rightWall = new Drawable(0.25, textureHandler.get("wall")).setPos(240 - wallWidth, i * 270);

			this.addCollidable(leftWall);
			this.addCollidable(rightWall);
		}

		let platformWidth = textureHandler.get("platform").width * 0.25;

		this.lift = new Lift(0.25, textureHandler.get("platform"), 1);
		this.lift.setPos(-platformWidth/2, 100);
		this.addCollidable(this.lift);
	}

	start() {
		super.start();
		this.walls = [];

		for (let collidable of this.gameState) {
			if (collidable instanceof Lift) {
				camera.target = collidable;
				camera.followTargetY = true;
				camera.followTargetX = false;
				camera.setOffset(0, -0.33);
				camera.setPos(0, 0);
			}else if (collidable instanceof Drawable && collidable.texture === textureHandler.get("wall")) {
				this.walls.push(collidable);
			}
		}

	}

	update() {
		for (let wall of this.walls) {
			wall.translate(0, -this.lift.speed);
		}
	}
}