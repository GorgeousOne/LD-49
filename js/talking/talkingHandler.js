
class TalkingHandler extends InputListener {

	constructor() {
		super();
		this.activeTalk = undefined;
		this.inputKeys = [p5.ENTER, ' ']
	}

	setTalk(talk) {
		this.activeTalk = talk;
		this.activeTalk.start();
	}

	onKeyPress(keyEvent) {
		if (undefined === this.activeTalk) {
			return;
		}
		if (this.inputKeys.contains(keyEvent.key)) {
			this.activeTalk.continue();

			if (this.activeTalk.hasEnded) {
				this.activeTalk = undefined;
			}
		}
		keyEvent.isCancelled = true;
	}
}