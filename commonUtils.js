export const getRandomNumber = (min, max) => {
	const range = Math.abs(max - min);

	return Math.round(Math.random() * range) + min;
}
