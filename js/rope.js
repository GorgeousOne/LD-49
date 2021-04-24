
class Rope {

	constructor(x, y, duration) {
		this.startTime = Date.now();
		this.pos = createVector(x, y);
		this.duration = duration;
	}

	timeLeft() {
		return this.duration - (Date.now() - this.startTime);
	}
}