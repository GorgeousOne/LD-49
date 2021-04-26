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

	isRunning() {
		return this.startTime != null && Date.now() - this.startTime < this.duration;
	}

	isOver() {
		if (this.startTime != null && Date.now() - this.startTime >= this.duration) {
			this.hasStarted = false;
			return true;
		}
		return false;
	}
}