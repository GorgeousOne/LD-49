
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

		for (let listener of this._updateListeners) {
			if (typeof listener.onRedraw === 'function') {
				listener.onRedraw(dTime);
			}
		}
		this._lastDraw = time;
	}

	callFixedUpdates() {
		let time = Date.now();
		this._accumulator += time - this._lastFixedUpdate;

		while (this._accumulator > this._fixedUpdateInterval) {
			for (let listener of this._updateListeners) {
				if (typeof listener.onRedraw === 'function') {
					listener.onFixedUpdate(this._fixedUpdateInterval);
				}
			}
			this._accumulator -= this._fixedUpdateInterval;
		}
		this._lastFixedUpdate = time;
	}
}