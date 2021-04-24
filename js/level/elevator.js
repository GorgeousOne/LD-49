class Elevator extends Level {

	constructor() {
		super(createVector(0, 0));

		let wallWidth = textureHandler.getImage("wall").width * 0.5;
		this.addCollidable(new Drawable(0.5, textureHandler.getImage("wall")).setPos(-480, 0));
		this.addCollidable(new Drawable(0.5, textureHandler.getImage("wall")).setPos(480 - wallWidth, 0));

		let platformWidth = textureHandler.getImage("platform").width * 0.5;

		let lift = new Lift(0.5, textureHandler.getImage("platform"));
		lift.setPos(-platformWidth/2, 0);

		this.addCollidable(lift);
		// this.addCollidable(new Lift(0.5, textureHandler.getImage("platform")).setPos(-platformWidth/2, 0));
		console.log(lift instanceof Drawable);
		//camera.target = 0;
		camera.followTargetY = true;
		camera.followTargetX = false;
		camera.setPos(0, 0);
	}

}