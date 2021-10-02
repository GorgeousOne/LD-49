class CameraController {

	constructor() {
		this._target = undefined;
		this._followTargetX = true;
		this._followTargetY = false;

		this._pos = createVector();
		this._focusOffset = createVector();
		this._zoom = 1;
	}

	minX() {
		return (-width / 2 + this._focusOffset.x * width) / this._zoom + this._pos.x;
	}

	maxX() {
		return (width / 2 + this._focusOffset.x * width) / this._zoom + this._pos.x;
	}

	minY() {
		return (-height / 2 + this._focusOffset.y * height) / this._zoom + this._pos.y;
	}

	maxY() {
		return (height / 2 + this._focusOffset.y * height) / this._zoom + this._pos.y;
	}

	setPos(x, y) {
		this._pos.set(x, y);
	}

	setTarget(target, followX = true, followY = true) {
		this._target = target;
		this._followTargetX = followX;
		this._followTargetY = followY;
	}
	/**
	 * Sets offset of viewing center to targeted object
	 * @param relX
	 * @param relY
	 */
	setOffset(relX, relY) {
		this._focusOffset.set(relX, relY)
	}

	shake(amplitude, duration) {
		this._isShaking = true;
		this._shakeStrength = amplitude;
		this._shakeDuration = duration;
		this._shakeStart = Date.now();
	}

	focus() {
		if (this._target) {
			if (this._followTargetX) {
				this._pos.x = this._target._pos.x;
			}
			if (this._followTargetY) {
				this._pos.y = this._target._pos.y;
			}
		}
		translate(width / 2 - this._focusOffset.x * width, height / 2 - this._focusOffset.y * height);
		scale(this._zoom);
		translate(-this._pos.x, -this._pos.y);

		if (this._isShaking) {
			this.applyShake();
		}
	}

	applyShake() {
		let timeSinceStart = Date.now() - this._shakeStart;

		if (timeSinceStart > this._shakeDuration) {
			this._isShaking = false;
			return;
		}
		let currentStrength = (1 - (timeSinceStart / this._shakeDuration));
		currentStrength *= currentStrength * this._shakeStrength;
		translate(random(-currentStrength, currentStrength), random(-currentStrength, currentStrength));
	}
}