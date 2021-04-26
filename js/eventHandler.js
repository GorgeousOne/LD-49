class EventHandler {

	constructor() {
		this.collisionListeners = [];
		this.addCollisionListener(this);
	}

	addCollisionListener(listener) {
		if (typeof listener.onCollide !== 'function') {
			console.error(typeof listener + " has no function onCollide")
		}
		this.collisionListeners.push(listener)
	}

	callCollisionEvent(collidable1, collidable2) {
		collidable2.hitbox.outline = color(0, 0, 255);

		if (collidable2 instanceof Trigger) {
			collidable2.activate();
		}
		// if (collidable1 instanceof Trigger) {
		// 	collidable2.activate();
		// }

		for (let listener of this.collisionListeners) {
			listener.onCollide(collidable1, collidable2);
		}
	}

	onCollide(c1, c2) {
		if (c1 instanceof Sword) {
			this._handleSword(c1, c2);
		}
		if (c1.isMonster || c2.isMonster) {
			this._monsterDamage(c1, c2);
		}
	}

	_handleSword(c1, c2) {
		if (c2 instanceof Sword) {
			[c1, c2] = [c2, c1];
		}
		if (c2 instanceof Cobweb || c2 instanceof Spider) {
			camera.shake(2, 250);
			removeMonster(c2);
		}
	}

	_monsterDamage(c1, c2) {
		if (c2.isMonster) {
			[c1, c2] = [c2, c1];
		}
		if (c2.isMonster) {
			return;
		}
		if (c1 instanceof Cobweb) {
			removeMonster(c1);
		}
		if (c1 instanceof Globe && c2 instanceof Lift) {
			globeBonk.play();
			camera.shake(3, 500);
			return;
		}
		if (!(c2 instanceof Player)) {
			return;
		}
		lifebar.damage();

		if (c1 instanceof Book) {
			bookSound.play();
			c1.velocity.x = 3;
		}
	}
}