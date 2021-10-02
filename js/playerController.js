
const acceleration = 0.15;
const maxSpeed = 4;

class PlayerController extends UpdateListener {

	constructor(player) {
		super();
		this._player = player;
	}

	onMousePress(mouseEvent) {
		this._player.attack();
	}

	onKeyPress(keyEvent) {
		if (87 === keyEvent.key) { //w
			this._player.jump(110);
		}
	}

	onKeyRelease(keyEvent) {
		if (87 === keyEvent.key) { //w
			this._player.hasJumpedOnce = false;
		}
	}

	onFixedUpdate(dTime) {
		if (keyIsDown(65)) { //a
			this._player.walk(-acceleration, maxSpeed);
		}
		if (keyIsDown(68)) { //d
			this._player.walk(acceleration, maxSpeed);
		}
	}
}