import Character from './character.js';
import characterData from './data.js';

let monstersArray = ['orc', 'demon', 'goblin'];

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  wizard.getDiceHtml();
  monster.getDiceHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();
  if (wizard.dead) {
    endGame();
  } else if (monster.dead) {
    if (monstersArray.length > 0) {
      monster = getNewMonster();
      render();
    } else {
      endGame();
    }
  }
}

function endGame() {
  const endMessage =
    wizard.health === 0 && monster.health === 0
      ? 'No victors - all creatures are dead'
      : wizard.health > 0
      ? 'The Wizard Wins'
      : 'The Monster is Victorious';

  const endEmoji = wizard.health > 0 ? '🔮' : '☠️';
  document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `;
}

document.getElementById('attack-button').addEventListener('click', attack);

function render() {
  document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
  document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
