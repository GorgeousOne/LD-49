
class TextureHandler {

	constructor() {
		this.images = new Map();
		this.animations = new Map();
	}

	get(nameKey) {
		if (!this.images.has(nameKey)) {
			console.error("no key " + nameKey);
		}
		return this.images.get(nameKey);
	}

	getAni(nameKey) {
		return this.animations.get(nameKey);
	}

	loadImage(nameKey, path) {
		this.images.set(nameKey, loadImage(path));
	}

	loadAni(nameKey, directory, fileName) {
		let aniPath = directory + "/" + fileName + ".png";
		let texPath = directory + "/" + fileName + ".txt";

		loadImage(aniPath, spriteSheet => {
			loadStrings(texPath, texFile => {
				this.animations.set(nameKey, this._createAni2(spriteSheet, texFile));
			});
		});
	}

	_createAni(spriteSheet, texFile) {
		if (texFile.length < 2) {
			console.error('Invalid animation txt file!');
			return null;
		}
		let frameInterval = parseInt(texFile[0]);
		let frames = [];

		for (let i = 1; i < texFile.length; i++) {
			let imgCoords = texFile[i].split(' ').map(coord => parseInt(coord));

			frames.push(spriteSheet.get(
				imgCoords[0],
				imgCoords[1],
				imgCoords[2],
				imgCoords[3]
			));
		}
		return new Ani(frames, frameInterval);
	}

	_createAni2(spriteSheet, texFile) {
		if (texFile.length < 2) {
			console.error('Invalid animation txt file!');
			return null;
		}
		let frameInterval = parseInt(texFile[0]);
		let dimensions = texFile[1].split(' ');

		let imgWidth = parseInt(dimensions[0]);
		let imgHeight = parseInt(dimensions[1]);
		let frames = [];

		for (let x = 0; x < spriteSheet.width; x += imgWidth) {
			frames.push(spriteSheet.get(x, 0, imgWidth, imgHeight));
		}
		return new Ani(frames, frameInterval);
	}
}