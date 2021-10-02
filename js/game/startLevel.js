
class StartLevel {

	constructor(displayHandler, camera) {
		this._ball = new Ball(0, 0, 10, color(255));
		this._others = [];
		this._others.push(new Ball(100, 0, 25, color(255, 204, 0), 100))

		// this._others[0].addVelocity(createVector(0, -0.01))
		// this._ball.addVelocity(createVector(0, 0.9))

		this._displayHandler = displayHandler;
		this._camera = camera;
	}

	start() {
		// this._camera.setTarget(this._ball);
		this._registerBall(this._ball);
		this._others.forEach(ball => this._registerBall(ball));
	}

	_registerBall(ball) {
		this._displayHandler.addDrawable(ball);
		physicsHandler.addBall(ball);
	}
}