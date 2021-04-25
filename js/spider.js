
const ropingSpeed = 1.5;

class Spider {

	constructor() {
		console.log("spider spawn");
		this.hang = new Drawable(1, textureHandler.get("spider-hang"), true, false);
		this.walk = new Drawable(1, textureHandler.get("spider-walk"), true, true, true);
		this.walk.hitbox.size.set(11, 10);
		this.walk.hitbox.translate(6, 0);
		this.ropePos = null;

		this.ropingTimer = new Timer(2000);
		this.cobwebTimer = new Timer(1000);
	}

	spawn(x, y) {
		this.ropePos = createVector(x, y);
		this.hang.setPos(x, y);
		this.ropingTimer.start();
	}

	despawn() {
		physicsHandler.removeCollidable(this.walk);
	}

	display() {
		let shape = this.walk;

		if (this.ropingTimer.hasStarted) {

			if (this.ropingTimer.isOver()) {
				physicsHandler.addCollidable(this.walk);
				this.walk.setPos(this.hang.pos.x, this.hang.pos.y);
				this.cobwebTimer.start();
			}else {
				this.ropeDown();
				return;
			}
		}

		if (this.cobwebTimer.isOver()) {
			let speed = 2 * Math.sign(player.pos.x - this.walk.pos.x);
			let web = new Cobweb(speed).setPos(this.walk.pos.x, this.walk.pos.y);

			physicsHandler.addCollidable(web);
			addDrawable(web);
			this.cobwebTimer.duration = 6000;
			this.cobwebTimer.start();
		}
		shape.display();
	}

	ropeDown() {
		this.hang.translate(0, ropingSpeed);

		push();
		strokeWeight(1);
		stroke(200);
		translate(this.hang.texture.width/2, 0);
		line(this.ropePos.x, this.ropePos.y, this.hang.pos.x, this.hang.pos.y + this.hang.texture.height/2);
		pop();

		this.hang.display();
	}
}

class Cobweb extends Drawable {

	constructor(velocity) {
		super(1, textureHandler.get("cobweb"), true, true);
		this.velocity.x = velocity;
		this.isMirrored = velocity < 0;
	}
}