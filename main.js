import {createPlayer, createReloadButton, createResultTitle} from './utils.js';
import {generateLog} from './log.js';
import {getEnemyAttack, getPlayerAttack, makeKick, getWinner} from './fightModel.js';
import {player1, player2} from './players.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.forms.attack;
const $buttonFight = $formFight.querySelector('.button');

$formFight.addEventListener('submit', (event) => {
	event.preventDefault();

	const enemyAttack = getEnemyAttack();
	const playerAttack = getPlayerAttack($formFight);

	makeKick(player1, player2, playerAttack, enemyAttack)
	makeKick(player2, player1, enemyAttack,playerAttack)

	if (player1.hp === 0 || player2.hp === 0) {
		const winner = getWinner(player1, player2);

		$buttonFight.disabled = true;
		$arenas.appendChild(createReloadButton());
		$arenas.appendChild(createResultTitle(winner));	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLog('start', player1, player2);
