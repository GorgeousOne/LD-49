
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
		let keyEvent = new KeyEvent(key);

		for (let listener of this._inputListeners) {
			if (keyEvent.isCancelled) {
				break;
			}
			if (typeof listener.onKeyPress === 'function') {
				listener.onKeyPress(keyEvent);
			}
		}
	}

	callKeyRelease(key) {
		let keyEvent = new KeyEvent(key);

		for (let listener of this._inputListeners) {
			if (keyEvent.isCancelled) {
				break;
			}
			if (typeof listener.onKeyRelease === 'function') {
				listener.onKeyRelease(keyEvent);
			}
		}
	}

	callMousePress(mouseButton) {
		let keyEvent = new MouseButtonEvent(mouseButton);

		for (let listener of this._inputListeners) {
			if (keyEvent.isCancelled) {
				break;
			}
			if (typeof listener.onMousePress === 'function') {
				listener.onMousePress(keyEvent);
			}
		}
	}

	callMouseRelease(mouseButton) {
		let mouseEvent = new MouseEvent(mouseButton);

		for (let listener of this._inputListeners) {
			if (mouseEvent.isCancelled) {
				break;
			}
			if (typeof listener.onMouseRelease === 'function') {
				listener.onMouseRelease(mouseEvent);
			}
		}
	}

	callMouseMove(x, y, lastX, lastY) {
		let mouseMoveEvent = new MouseMoveEvent(x, y, lastX, lastY);

		for (let listener of this._inputListeners) {
			if (mouseMoveEvent.isCancelled) {
				break;
			}
			listener.onMouseRelease(mouseMoveEvent);
		}
	}
}