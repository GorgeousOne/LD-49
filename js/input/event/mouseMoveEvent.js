
class MouseMoveEvent extends InputEvent {
	constructor(x, y, lastX, lastY, isDrag = false) {
		super();
		this.x = x;
		this.y = y;
		this.lastX = lastX;
		this.lastY = lastY;
		this.isDrag = isDrag;
	}
}