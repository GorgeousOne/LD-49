
class TalkingHandler extends InputListener {

	constructor() {
		super();
		this.inputKeys = [p5.ENTER, 32]
		this._activeTalk = undefined;
		this._talkCallback = undefined;
	}

	setTalk(talk, callback) {
		this._activeTalk = talk;
		this._talkCallback = callback;
		this._activeTalk.start();
	}

	onKeyPress(keyEvent) {
		if (undefined === this._activeTalk) {
			return;
		}
		if (this.inputKeys.includes(keyEvent.key)) {
			this._activeTalk.continue();

			if (this._activeTalk.hasEnded) {
				if (undefined !== this._talkCallback) {
					this._talkCallback();
				}
				this._activeTalk = undefined;
			}
		}
		keyEvent.isCancelled = true;
	}
}