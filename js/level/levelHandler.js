
class LevelHandler {

	constructor() {
		this._levels = []
		this._currentLevelIndex = -1;
	}

	addLevel(level) {
		this._levels.push(level);
	}

	startNextLevel() {
		if (this._currentLevelIndex > this._levels.length-1) {
			return;
		}

		if (this._currentLevelIndex > -1) {
			this._levels[this._currentLevelIndex].stop();
		}
		++this._currentLevelIndex;
		this._levels[this._currentLevelIndex].start();
	}
}