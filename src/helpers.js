/**
 * Gets a random integer which is inferior or equal to a random number
 * @param {number} max 
 */
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Function used to set blocks on the map
 * @param {number} chance a limit number between zero and one to customize the random boolean generation
 */
function getRandomBool(chance = 0.5) {
  const randomInt = Math.random();
  return randomInt > chance;
}

// When clicking on a cell
/**
 * Function launched when clicking on a map cell
 * @param {Event} e
 * @param {Game} game
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function eventFunction(e, game, elements) {
  let x = 0;
  let y = 0;

  // retrieve the coordinates of the td clicked
  if (e.target.tagName == "TD") {
    x = e.target.getAttribute("x");
    y = e.target.getAttribute("y");
  }

  game.movePlayerWithMouse(x, y, (fighting) => {
    display(game, elements);
    hightlightCurrentPlayerPanel(game, elements)
    if (fighting) {
      displayFightActionsButtons(game.currentIndex, elements)
    }
  });

}

