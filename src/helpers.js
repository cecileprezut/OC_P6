function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function getRandomBool(chance = 0.5) {
  const randomInt = Math.random();
  return randomInt > chance;
}

// When clicking on a cell
/**
 * function launched when clicking on a map cell
 * @param {Event} e
 * @param {Game} game
 */
function eventFunction(e, game,elements) {
  let x = 0;
  let y = 0;

  //récupérer les coordonnées x et y de la TD cliquée
  if (e.target.tagName == "TD") {
    x = e.target.getAttribute("x");
    y = e.target.getAttribute("y");
  }

  game.movePlayerWithMouse(x, y,(fighting)=>{
    display(game,elements);
    hightlightCurrentPlayerPanel (game, elements) 
    if(fighting){
        displayFightActionsButtons(game.currentIndex, elements)
    }
  });
  
}

