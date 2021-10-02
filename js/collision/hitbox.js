class HitBox {
	
}

class Rect {

	constructor(width, height) {
		this.pos = createVector();
		this.size = createVector(width, height);
		this.outline = color(255, 0, 0);
	}

	// setSize(width, height) {
	// 	this.widthX = width;
	// 	this.height = height;
	// }

	setPos(x, y) {
		this.pos.set(x, y);
	}

	translate(dx, dy) {
		this.pos.add(dx, dy);
	}

	minX() {
		return this.pos.x;
	}

	maxX() {
		return this.pos.x + this.size.x;
	}

	minY() {
		return this.pos.y;
	}

	maxY() {
		return this.pos.y + this.size.y;
	}

	intersects(otherBox) {
		return this.intersectsX(otherBox) && this.intersectsY(otherBox) ||
			otherBox.intersectsX(this) && otherBox.intersectsY(this);
	}

	intersectsX(otherBox) {
		return this.containsX(otherBox.minX()) || this.containsX(otherBox.maxX()) || otherBox.minX() <= this.minX() && otherBox.maxX() >= this.maxX();
	}

	intersectsY(otherBox) {
		return this.containsY(otherBox.minY()) || this.containsY(otherBox.maxY()) || otherBox.minY() <= this.minY() && otherBox.maxY() >= this.maxY();
	}

	contains(x, y) {
		return this.containsX(x) && this.containsY(y);
	}

	containsX(x) {
		return x > this.minX() && x < this.maxX();
	}

	containsY(y) {
		return y > this.minY() && y < this.maxY();
	}

	/**
	 * Returns bounding coordinate facing the given dir
	 * returns the minimum x coordinate for -1 and maximum x for 1
	 */
	getBoundX(dir) {
		if (dir === -1) {
			return this.minX();
		} else if (dir === 1) {
			return this.maxX();
		}
	}

	getBoundY(dir) {
		if (dir === -1) {
			return this.minY();
		} else if (dir === 1) {
			return this.maxY();
		}
	}

	display() {
		push();
		noFill();
		stroke(this.outline);
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		pop();
	}
}