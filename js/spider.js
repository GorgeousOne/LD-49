
const ropingTime = 2000;
const ropingSpeed = 2.5;
class Spider {

	constructor() {
		console.log("spider spawn");
		this.hang = new Drawable(1, textureHandler.getImage("spider-hang"), false);
		this.walk = new Drawable(1, textureHandler.getImage("spider-walk"), true, true);
		this.walk.hitbox.size.set(11, 10);
		this.walk.hitbox.translate(6, 0);
		this.rope = null;
	}

	spawn(x, y) {
		this.rope = new Rope(x, y, ropingTime);
		this.hang.setPos(x, y);
		console.log("spider hang " + this.hang.pos);
	}

	despawn() {
		physicsHandler.removeCollidable(this.walk);
	}

	display() {
		let shape = this.walk;

		if (this.rope) {
			if (this.rope.timeLeft() > 0) {
				this.ropeDown();
				return;
			}else {
				console.log("spider hang " + this.hang.pos);
				this.rope = null;
				physicsHandler.addCollidable(this.walk);
				this.walk.setPos(this.hang.pos.x, this.hang.pos.y);
			}
		}
		shape.display();
	}

	ropeDown() {
		this.hang.translate(0, ropingSpeed);

		push();
		strokeWeight(1);
		stroke(200);
		translate(this.hang.texture.width/2, 0);
		line(this.rope.pos.x, this.rope.pos.y, this.hang.pos.x, this.hang.pos.y + this.hang.texture.height/2);
		pop();
		this.hang.display();
	}
}