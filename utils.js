const createElement = (tag, className) => {
	const $element = document.createElement(tag);

	if (className) {
		$element.classList.add(className);
	}

	return $element;
}

export const createResultTitle = (name) => {
	const $resultTitle = createElement('div', 'resultTitle');

	if (name) {
		$resultTitle.innerText = `${name} wins`;
	} else {
		$resultTitle.innerText = 'draw'
	}

	return $resultTitle;
}

export const createReloadButton= () => {
	const $reloadButton = createElement('button', 'button');
	const $reloadButtonWrapper = createElement('div', 'reloadWrap');

	$reloadButton.setAttribute('type', 'button');
	$reloadButton.innerText = 'Restart';
	$reloadButton.addEventListener('click', function() {
		window.location.reload();
	});

	$reloadButtonWrapper.appendChild($reloadButton);

	return $reloadButtonWrapper;
}

export const createPlayer = ({ player, hp, name, img }) => {

	const $player = createElement('div', 'player' + player);
	const $progressbar = createElement('div', 'progressbar');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $character = createElement('div', 'character');
	const $img = createElement('img');

	$life.style.width = `${hp}%`;
	$name.innerText = name;
	$img.src = img;

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);
	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
}
