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
			this._handleCobweb(c1, c2);
			return
		}
		if (c1 instanceof Globe || c2 instanceof Globe) {
			this._handleGlobe(c1, c2);
			return
		}
		if (c1 instanceof Book || c2 instanceof Book) {
			this._handleBook(c1, c2);
			return
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

	_handleGlobe(c1, c2) {
		if (c2 instanceof Globe) {
			[c1, c2] = [c2, c1];
		}
		if (c2.isMonster) {
			return
		}
		if (c2 instanceof Player) {
			lifebar.damage();
		}
		if (c2 instanceof Lift) {
			camera.shake(3, 500);
		}
	}

	_handleBook(c1, c2) {
		if (c2 instanceof Book) {
			[c1, c2] = [c2, c1];
		}
		if (c2.isMonster) {
			return
		}
		if (c2 instanceof Player) {
			lifebar.damage();
			removeMonster(c1)
		}
	}
}