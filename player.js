import { createElement } from './utils.js';
export class Player {
	constructor(props) {
		this.player = props.player,
		this.name = props.name,
		this.hp = props.hp,
		this.img = props.img,
		this.weapon = props.weapon
	}

	changeHP = (damage) => {
		this.hp -= damage;

		if (this.hp <= 0) {
			this.hp = 0;
		}
	}

	elHP = () => {
		return document.querySelector(`.player${this.player} .life`);
	}

	renderHP = () => {
		this.elHP().style.width = `${this.hp}%`;
	}

	create = () => {
		const $player = createElement('div', 'player' + this.player);
		const $progressbar = createElement('div', 'progressbar');
		const $life = createElement('div', 'life');
		const $name = createElement('div', 'name');
		const $character = createElement('div', 'character');
		const $img = createElement('img');

		$life.style.width = `${this.hp}%`;
		$name.innerText = this.name;
		$img.src = this.img;

		$progressbar.appendChild($life);
		$progressbar.appendChild($name);
		$character.appendChild($img);
		$player.appendChild($progressbar);
		$player.appendChild($character);

		return $player;
	}
}
