
class Ani {

	/**
	 * @param frames array of frames of the animation
	 * @param frameInterval time in ms for each frame
	 */
	constructor(frames, frameInterval) {
		this.frames = frames;
		this.frameInterval = frameInterval;
	}

	/**
	 * Returns an image of the animation visible at the given time based on framInterval
	 * @param time
	 */
	getFrame(time) {
		let frameCount = Math.floor((time / this.frameInterval));
		return this.frames[frameCount % this.frames.length];
	}
}