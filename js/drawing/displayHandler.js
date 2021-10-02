
class DisplayHandler extends UpdateListener {

	constructor(background) {
		super();
		this._background = background;
		this._drawables = [];
	}

	onRedraw(dTime) {
		background(this._background);
		camera.focus();
		this._drawables.forEach(drawable => drawable.display())
	}

	addDrawable(drawable) {
		if (!this._drawables.includes(drawable)) {
			this._drawables.push(drawable);
		}
	}

	removeDrawable(drawable) {
		if (this._drawables.includes(drawable)) {
			let i = this._drawables.indexOf(drawable);
			this._drawables.splice(i, 1);
		}
	}
}