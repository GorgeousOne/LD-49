
class Entrance extends Level {

	constructor() {
		super(createVector(200, 400));
		this.addCollidable(new Collidable(1000, 20).setPos(100, 500));
		this.addCollidable(new Collidable(100, 100).setPos(200, 400));
		this.addCollidable(new Collidable(50, 50, true, true).setPos(400, 200));
	}
}