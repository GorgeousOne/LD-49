
class PlayerMoveHandler extends UpdateListener {

	constructor(player) {
		super();
		this._player = player;
	}

	onKeyPress(keyEvent) {
		if (87 === keyEvent.key) { //w
			this._player.jump(110);
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