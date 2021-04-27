class TheEnd extends Level {

	constructor() {
		super(createVector(0, 0));
		this.texts = [];

		this.texts.push(new PixelText("Aaah! Hehe..." +
			"\nThank you for bringing me my book." +
			"\n  >SPACE<", -100, -50, 2));
		this.texts.push(new PixelText("You know, it turned out that I could\n" +
			"simply google the thing I wanted to know.\n" +
			"But anyway, thanks for the effort.", -100, -50, 2));

		this.grandpa = new Drawable(textureHandler.get("grandpa-smile"));
		this.currentText = 0;
	}

	start() {
		camera.setOffset(0, 0);
		camera.pos.set(0, 0);
		successSound.play();
	}

	update() {
		this.texts[this.currentText].display();
		push();
		translate(-200, -50);
		scale(5);
		this.grandpa.display();
		pop();

		//60 key downs per second...
		if (keyIsDown(32)) {
			this.currentText = constrain(this.currentText + 1, 0, this.texts.length - 1);
		}
	}
}