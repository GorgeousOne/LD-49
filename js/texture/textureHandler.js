
class TextureHandler {

	constructor() {
		this.images = new Map();
		this.sprites = new Map();
	}

	getImage(nameKey) {
		return this.images.get(nameKey);
	}

	getAni(nameKey) {
		return this.sprites.get(nameKey);
	}

	loadImage(nameKey, path) {
		this.images.set(nameKey, loadImage(path));
	}

	loadAni(nameKey, directory, fileName) {
		let aniPath = directory + "/" + fileName + ".png";
		let texPath = directory + "/" + fileName + ".txt";

		loadImage(aniPath, spriteSheet => {
			loadStrings(texPath, texFile => {
				this.sprites.set(nameKey, this._createAni(spriteSheet, texFile));
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
}