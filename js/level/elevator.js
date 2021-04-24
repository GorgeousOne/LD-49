class Elevator extends Level {

	constructor() {
		super(createVector(0, 0));

		let wallWidth = textureHandler.getImage("wall").width * 0.25;

		for (let i = 0; i < 50; ++i) {
			this.addCollidable(new Drawable(0.25, textureHandler.getImage("wall")).setPos(-240, i * 270));
			this.addCollidable(new Drawable(0.25, textureHandler.getImage("wall")).setPos(240 - wallWidth, i * 270));
		}

		let platformWidth = textureHandler.getImage("platform").width * 0.25;

		let lift = new Lift(0.25, textureHandler.getImage("platform"));
		lift.setPos(-platformWidth/2, 100);
		this.addCollidable(lift);
	}

	start() {
		super.start();

		for (let collidable of this.gameState) {
			if (collidable instanceof Lift) {
				camera.target = collidable;
				camera.followTargetY = true;
				camera.followTargetX = false;
				camera.setOffset(0, -0.33);
				camera.setPos(0, 0);
			}
		}
	}

}