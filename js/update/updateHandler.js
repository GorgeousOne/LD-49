
class UpdateHandler {

	constructor(fixedUpdateInterval) {
		this._updateListeners = [];
		this._fixedUpdateInterval = fixedUpdateInterval;
		this.resetTimings();
	}

	resetTimings() {
		this._lastDraw = Date.now();
		this._lastFixedUpdate = Date.now();
		this._accumulator = 0;
	}

	addListener(listener) {
		this._updateListeners.push(listener);
	}

	callRedraw() {
		let time = Date.now();
		let dTime = time - this._lastDraw;
		this._updateListeners.forEach(listener => listener.onRedraw(dTime));
		this._lastDraw = time;
	}

	callFixedUpdates() {
		let time = Date.now();
		this._accumulator += this._lastFixedUpdate - time;

		while (this._accumulator > this._fixedUpdateInterval) {
			this._updateListeners.forEach(listener => listener.onFixedUpdate(this._fixedUpdateInterval));
			this._accumulator -= this._fixedUpdateInterval;
		}
		this._lastFixedUpdate = time;
	}
}