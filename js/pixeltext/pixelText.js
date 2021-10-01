class PixelText extends Text {

	constructor(content, x, y, fontSize = 1) {
		super();
		this.pos = createVector(x, y);
		this.paragraphs = content.split("\n");
		this.lineSpacing = 2;
		this.paddingX = 3;
		this.paddingY = 3;
		this.fontSize = fontSize;

		let lineWidths = this.paragraphs.map(line => pixelWidth(line));
		this.width = Math.max(...lineWidths) + 2 * this.paddingX;
		this.height =
			this.paragraphs.length * letterHeight +
			(this.paragraphs.length - 1) * this.lineSpacing +
			2 * this.paddingY;

		this.textColor = color(0);
		this.backColor = color(255);
	}

	display() {
		if (!this.textGraphic) {
			this._createTextGraphic();
		}
		push();
		fill(this.backColor);
		noStroke();
		rect(this.pos.x, this.pos.y, this.width * this.fontSize,
			this.height * this.fontSize);
		image(this.textGraphic, this.pos.x, this.pos.y,
			this.width * this.fontSize,
			this.height * this.fontSize);
		pop();
	}

	_createTextGraphic() {
		this.textGraphic = createGraphics(this.width, this.height);
		this.textGraphic.noSmooth();
		this.textGraphic.background(this.backColor);
		this.textGraphic.tint(this.textColor);

		let cursorPos = createVector(this.paddingX, this.paddingY);

		for (let line of this.paragraphs) {
			for (let i = 0; i < line.length; i++) {
				let nextChar = line.charAt(i);
				let charImg = LetterImages.get(nextChar);

				this.textGraphic.image(charImg, cursorPos.x, cursorPos.y);
				cursorPos.add(charImg.width + 1, 0);
			}

			cursorPos.add(0, letterHeight + this.lineSpacing);
			cursorPos.x = this.paddingX;
		}
	}
}