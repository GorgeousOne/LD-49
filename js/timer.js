
class Timer {

	constructor(duration) {
		this.duration = duration;
		this.startTime = null;
		this.hasStarted = false;
	}

	start() {
		this.startTime = Date.now();
		this.hasStarted = true;
	}

	isOver() {
		if ( Date.now() - this.startTime > this.duration) {
			this.hasStarted = false;
			return true;
		}
		return false;
	}
}