import Character from '/Character.js';
import characterData from '/data.js';

function endGame() {
  const endMessage =
    wizard.health === 0 && orc.health === 0
      ? 'No one wins, both are dead'
      : wizard.health > 0
      ? 'Wizard wins'
      : 'Orc wins';

  const endEmoji = wizard.health > 0 ? '🔮' : '☠️';
  document.body.innerHTML = `<div class="end-game">
              <h2>Game Over</h2>
              <h3>${endMessage}</h3>
              <p class="end-emoji">${endEmoji}</p>
          </div>`;
}

function attack() {
  wizard.getDiceHtml();
  orc.getDiceHtml();
  wizard.takeDamage(orc.currentDiceScore);
  orc.takeDamage(wizard.currentDiceScore);
  render();
  if (orc.dead || wizard.dead) {
    endGame();
  }
}

function render() {
  document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
  document.getElementById('monster').innerHTML = orc.getCharacterHtml();
}

document.getElementById('attack-button').addEventListener('click', attack);
const wizard = new Character(characterData.hero);
const orc = new Character(characterData.monster);
render();
