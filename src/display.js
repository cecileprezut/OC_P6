/**
 * Displays the map and the basic players' panels (buttons and shield excluded)
 * @param {Object} game
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function display(game, elements) {
  elements.mapElt.innerHTML = "";

  const tableElt = document.createElement("table");
  const tbodyElt = document.createElement("tbody");
  elements.mapElt.appendChild(tableElt);
  tableElt.appendChild(tbodyElt);

  for (let y = 0; y < Math.sqrt(game.map.cells.length); y++) {
    const trElt = document.createElement("tr");
    tbodyElt.appendChild(trElt);

    for (let x = 0; x < Math.sqrt(game.map.cells.length); x++) {
      const tdElt = document.createElement("td");
      trElt.appendChild(tdElt);
      tdElt.setAttribute("x", x);
      tdElt.setAttribute("y", y);

      tdElt.addEventListener("click", (e) => {
        eventFunction(e, game, elements);
      });
    }
  }

  for (let i = 0; i < game.map.cells.length; i++) {
    game.map.cells.forEach((cell) => {
      switch (cell.player) {
        // For each cell with a player, retrieves the td with the same coordinates and adds the player class to it
        case game.players[0]:
          const tdEltWithPlayer1 = document.querySelector(
            "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
          );
          tdEltWithPlayer1.classList.add("player1");
          break;
        case game.players[1]:
          const tdEltWithPlayer2 = document.querySelector(
            "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
          );
          tdEltWithPlayer2.classList.add("player2");
          break;
      }

      if (cell.weapon) {
        switch (cell.weapon.name) {
          // For each cell with a weapon, retrieves the td with the same coordinates and adds the weapon class to it
          case "Cookie":
            const tdEltWithCookie = document.querySelector(
              "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
            );
            tdEltWithCookie.classList.add("cookie");
            break;
          case "Rainbow":
            const tdEltWithRainbow = document.querySelector(
              "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
            );
            tdEltWithRainbow.classList.add("rainbow");
            break;
          case "Teddy Bear":
            const tdEltWithTeddyBear = document.querySelector(
              "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
            );
            tdEltWithTeddyBear.classList.add("teddyBear");
            break;
          case "Flower":
            const tdEltWithFlower = document.querySelector(
              "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
            );
            tdEltWithFlower.classList.add("flower");
            break;
        }
      }

      if (cell.block) {
        // For each cell with a block, retrieves the td with the same coordinates and adds the block class to it
        const tdEltWithNoAccess = document.querySelector(
          "[x=" + CSS.escape(cell.x) + "][y=" + CSS.escape(cell.y) + "]"
        );
        tdEltWithNoAccess.classList.add("block");
      }
    });
  }

  // display of the players' panels
  elements.player1NameElt.innerHTML = game.players[0].name;
  elements.player2NameElt.innerHTML = game.players[1].name;

  elements.spanEltPlayer1LifeScore.innerHTML = game.players[0].life;
  elements.spanEltPlayer2LifeScore.innerHTML = game.players[1].life;

  elements.player1WeaponNameElt.innerHTML = game.players[0].weapon.name;
  elements.player2WeaponNameElt.innerHTML = game.players[1].weapon.name;

  elements.player1WeaponVisualElt.setAttribute(
    "src",
    game.players[0].weapon.picture
  );
  elements.player1WeaponVisualElt.setAttribute(
    "alt",
    CSS.escape(game.players[0].weapon.name) + " weapon"
  );
  elements.player2WeaponVisualElt.setAttribute(
    "src",
    game.players[1].weapon.picture
  );
  elements.player2WeaponVisualElt.setAttribute(
    "alt",
    CSS.escape(game.players[1].weapon.name) + " weapon"
  );

  elements.player1WeaponDamageElt.innerHTML = game.players[0].weapon.damage;
  elements.player2WeaponDamageElt.innerHTML = game.players[1].weapon.damage;


}

/**
 * 
 * @param {number} currentIndex 0 or 1, to identify the turn and thus, the currentPlayer
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function displayEndOfTurnButton(currentIndex, elements) {
  // Si current index === 0 -> player 1
  if (currentIndex === 0) {
    elements.player1EndTurnElt.removeAttribute("class", "hidden");
  } else {
    elements.player2EndTurnElt.removeAttribute("class", "hidden");
  }
}

/**
 * 
 * @param {number} currentIndex 0 or 1, to identify the turn and thus, the currentPlayer
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function hideEndOfTurnButton(currentIndex, elements) {

  // Si current index === 0 -> player 1
  if (currentIndex === 1) {
    elements.player1EndTurnElt.setAttribute("class", "hidden");
  } else {
    elements.player2EndTurnElt.setAttribute("class", "hidden");
  }

}

/**
 * Displays Fight and Defend yourself buttons
 * @param {number} currentIndex 0 or 1, to identify the turn and thus, the currentPlayer
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function displayFightActionsButtons(currentIndex, elements) {
  //TODO:utiliser class
  if (currentIndex === 0) {
    elements.player1ShieldElt.innerHTML = "";
  } else {
    elements.player2ShieldElt.innerHTML = "";
  }

  // /!\ CurrentPlayer is changed beforehand
  if (currentIndex === 0) {
    elements.player1DefendBtnElt.removeAttribute("disabled", "");
    elements.player1DefendBtnElt.removeAttribute("class", "hidden");
    elements.player1FightBtnElt.removeAttribute("disabled", "");
    elements.player1FightBtnElt.removeAttribute("class", "hidden");
    elements.player2DefendBtnElt.setAttribute("disabled", "");
    elements.player2DefendBtnElt.removeAttribute("class", "hidden");
    elements.player2FightBtnElt.setAttribute("disabled", "");
    elements.player2FightBtnElt.removeAttribute("class", "hidden");
  } else {
    elements.player2DefendBtnElt.removeAttribute("disabled", "");
    elements.player2DefendBtnElt.removeAttribute("class", "hidden");
    elements.player2FightBtnElt.removeAttribute("disabled", "");
    elements.player2FightBtnElt.removeAttribute("class", "hidden");
    elements.player1DefendBtnElt.setAttribute("disabled", "");
    elements.player1DefendBtnElt.removeAttribute("class", "hidden");
    elements.player1FightBtnElt.setAttribute("disabled", "");
    elements.player1FightBtnElt.removeAttribute("class", "hidden");
  }
}

/**
 * Displays the shield
 * @param {number} currentIndex 0 or 1, to identify the turn and thus, the currentPlayer
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function displayShield(currentIndex, elements) {
  const shieldImg = document.createElement("IMG")
  shieldImg.setAttribute('src', 'assets/shield.png')
  shieldImg.setAttribute('width', '20')
  shieldImg.setAttribute('alt', 'Shield')
  if (currentIndex === 0) {
    elements.player1ShieldElt.appendChild(shieldImg);
  } else {
    elements.player2ShieldElt.appendChild(shieldImg);
  }
}

/**
 * 
 * @param {Object} game 
 */
function refreshLifeBar(game) {
  $("#player1ProgressBar")
    .attr("aria-valuenow", game.players[0].life)
    .css("width", game.players[0].life + "%");
  $("#player2ProgressBar")
    .attr("aria-valuenow", game.players[1].life)
    .css("width", game.players[1].life + "%");

  if (game.players[0].life < 50) {
    $("#player1ProgressBar").attr("class", "bg-danger");
  }
  if (game.players[1].life < 50) {
    $("#player2ProgressBar").attr("class", "bg-danger");
  }
}

/**
 * Displays a modal offering to start a new game at the end of a game
 * @param {Object} game 
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function displayModal(game, elements) {
  elements.winnerNameElt.innerHTML = game.currentPlayer.name;
  $("#modal").modal("show");
}

/**
 * Displays the number of moves done for the current turn
 * @param {Object} game 
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function displayNumberOfMovesCount(game, elements) {
  if (game.currentIndex === 0) {
    elements.player1NumberOfMovesParagraphElt.removeAttribute('class', 'hidden')
    elements.player1NumberOfMovesSpan.innerHTML = game.keyboardInputCount
  } else {
    elements.player2NumberOfMovesParagraphElt.removeAttribute('class', 'hidden')
    elements.player2NumberOfMovesSpan.innerHTML = game.keyboardInputCount
  }

}

/**
 * 
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function hideNumberOfMovesCount(elements) {
  elements.player1NumberOfMovesParagraphElt.setAttribute('class', 'hidden')
  elements.player2NumberOfMovesParagraphElt.setAttribute('class', 'hidden')

}

/**
 * 
 * @param {Object} game 
 * @param {Object} elements all DOM elements resulting from loadElements();
 */
function hightlightCurrentPlayerPanel(game, elements) {
  if (game.currentIndex === 0) {
    elements.leftDivElt.style.cssText = 'border: solid 3px #8CB74F'
    elements.rightDivElt.style.cssText = 'border: solid 1px black'
  } else {
    elements.leftDivElt.style.cssText = 'border: solid 1px black'
    elements.rightDivElt.style.cssText = 'border: solid 3px #8CB74F'
  }
}