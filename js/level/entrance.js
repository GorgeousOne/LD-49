class Entrance extends Level {

	constructor() {
		super(createVector(0, 0));
		this.text = new PixelText("Young boy," +
			"\nwould you be so kind to" +
			"\nbring me a book from the" +
			"\nlibrary?" +
			"\nThe one from all the way down?" +
			"\n" +
			"\n  >SPACE<", -100, -50, 2);
		// addDrawable(this.text);
		this.grandpa = new Drawable(textureHandler.get("grandpa"));
	}

	update() {
		this.text.display();
		push();
		translate(-200, -50);
		scale(5);
		this.grandpa.display();
		pop();

		if (keyIsDown(32)) {
			nextLevel();
		}
	}
}