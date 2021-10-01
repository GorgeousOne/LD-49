
const ListenerPriority = {
	LOWEST: "lowest",
	LOW: "low",
	NORMAL: "normal",
	HIGH: "high",
	HIGHEST: "highest",
	MONITOR: "monitor"
}

class InputHandler {

	constructor() {
		this._inputListeners = []
	}

	addListener(listener, priority) {
		this._inputListeners.push(listener);
	}

	callKeyPress(key) {
		let keyEvent = new KeyboardEvent(key);

		for (let listener of this._inputListeners) {
			if (keyEvent.isCancelled) {
				break;
			}
			listener.onKeyPress(keyEvent);
		}
	}

	callKeyRelease(key) {
		let keyEvent = new KeyboardEvent(key);

		for (let listener of this._inputListeners) {
			if (keyEvent.isCancelled) {
				break;
			}
			listener.onKeyRelease(keyEvent);
		}
	}
}