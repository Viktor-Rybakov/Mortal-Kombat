export const getRandomNumber = (min, max) => {
	const range = Math.abs(max - min);

	return Math.round(Math.random() * range) + min;
}

export const getCurrentTime = () => {
	const date = new Date();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
}

export const createElement = (tag, className) => {
	const $element = document.createElement(tag);

	if (className) {
		$element.classList.add(className);
	}

	return $element;
}
