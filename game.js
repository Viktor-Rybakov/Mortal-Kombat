import { Player } from './player.js';
import { generateLog } from './log.js';
import { getRandomNumber, createElement } from './utils.js';

export class Game {

	constructor(arenasClass, buttonClass) {
		this.$arenas = document.querySelector(arenasClass),
		this.$formFight = document.forms.attack,
		this.$buttonFight = this.$formFight.querySelector(buttonClass);
	}

	getPlayers = async () => {
		const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
		return body;
	}

	start = async () => {
		const players = await this.getPlayers();

		const p1 = players[getRandomNumber(0, players.length - 1)];
		const p2 = players[getRandomNumber(0, players.length - 1)];

		this.player1 = new Player({
			...p1,
			player: 1
		});
		this.player2 = new Player({
			...p2,
			player: 2
		});

		this.$arenas.appendChild(this.player1.create());
		this.$arenas.appendChild(this.player2.create());
		generateLog('start', this.player1, this.player2);

		this.$formFight.addEventListener('submit', async (event) => {
			event.preventDefault();

			const playersAttack = await this.getPlayersAttack(this.getPlayerAttack());

			const playerAttack = playersAttack.player1;
			const enemyAttack = playersAttack.player2;


			this.makeKick(this.player1, this.player2, playerAttack, enemyAttack)
			this.makeKick(this.player2, this.player1, enemyAttack,playerAttack)

			if (this.player1.hp === 0 || this.player2.hp === 0) {
				const winner = this.getWinner(this.player1, this.player2);

				this.$buttonFight.disabled = true;
				this.$arenas.appendChild(this.createReloadButton());
				this.$arenas.appendChild(this.createResultTitle(winner));
			}
		});

	}

	getPlayersAttack = async ({ hit, defence }) => {
		const body = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
			method: 'POST',
			body: JSON.stringify({
				hit: hit,
				defence: defence,
			})
		}).then(res => res.json());

		return body;
	}

	getPlayerAttack = () => {
		const playerAttack = {};

		for (let item of this.$formFight) {
			if (item.checked && item.name === 'hit') {
				playerAttack.hit = item.value;
			}
			if (item.checked && item.name === 'defence') {
				playerAttack.defence = item.value;
			}

			item.checked = false;
		}

		return playerAttack;
	}

	getWinner = (player1, player2) => {
		const { hp: hp1, name: name1 } = player1;
		const { hp: hp2, name: name2 } = player2;

		if (hp1 === 0 && hp2 === 0) {
			generateLog('draw');
			return null;
		} else if (hp1 === 0 && hp1 < hp2) {
			generateLog('end', player2, player1);
			return name2;
		} else if (hp2 === 0 && hp2 < hp1) {
			generateLog('end', player1, player2);
			return name1;
		}
	}

	makeKick = (playerKick, playerDefence, playerKickAttack, playerDefenceAttack) => {
		if (playerDefenceAttack.defence === playerKickAttack.hit) {
			generateLog('defence', playerKick, playerDefence);
		}

		if (playerDefenceAttack.defence !== playerKickAttack.hit) {
			playerDefence.changeHP(playerKickAttack.value);
			playerDefence.renderHP();
			generateLog('hit', playerKick, playerDefence, playerKickAttack.value);
		}
	}

	createResultTitle = (name) => {
		const $resultTitle = createElement('div', 'resultTitle');

		if (name) {
			$resultTitle.innerText = `${name} wins`;
		} else {
			$resultTitle.innerText = 'draw'
		}

		return $resultTitle;
	}

	createReloadButton = () => {
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
}
