
class Talk {

	constructor() {
		this.hasEnded = true;
		this._currentTextIndex = -1;
		this._texts = [];
	}

	addText(text) {
		this._texts.push(text);
		return this;
	}

	start() {
		console.assert(0 !== this._texts.length);
		this._currentTextIndex = 0;
		this.hasEnded = false;
	}

	display() {
		this._texts[this._currentTextIndex].display();
	}

	continue() {
		++this._currentTextIndex;

		if (this._currentTextIndex >= this._texts.length) {
			this._currentTextIndex = -1;
			this.hasEnded = true;
		}
	}
}