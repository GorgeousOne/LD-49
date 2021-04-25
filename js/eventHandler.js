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
		if (c1 instanceof Cobweb || c2 instanceof Cobweb) {
			this._handleCobweb(c1, c2)
		}
	}

	_handleCobweb(c1, c2) {
		if (c2 instanceof Cobweb) {
			[c1, c2] = [c2, c1];
		}
		if (c2.isMonster) {
			return
		}

		if (c2 instanceof Player) {
			lifebar.damage();
		}
		removeMonster(c1)
	}
}