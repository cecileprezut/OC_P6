/**
 * makes sure the page content is loaded beforehand
 */
document.addEventListener("DOMContentLoaded", function () {
  elements = loadElements();
  const game = new Game();
  console.log(game);

  display(game, elements);
  hightlightCurrentPlayerPanel(game, elements)

  elements.player1EndTurnElt.addEventListener("click", () => {
    game.changePlayer(() => {
      hideEndOfTurnButton(game.currentIndex, elements);
      hideNumberOfMovesCount(elements)
      hightlightCurrentPlayerPanel(game, elements)
    });
  });

  elements.player2EndTurnElt.addEventListener("click", () => {
    game.changePlayer(() => {
      hideEndOfTurnButton(game.currentIndex, elements);
      hideNumberOfMovesCount(elements)
      hightlightCurrentPlayerPanel(game, elements)
    });
  });

  elements.player1DefendBtnElt.addEventListener("click", () => {
    game.currentPlayer.setDefense();
    displayShield(game.currentIndex, elements);
    game.changePlayer(() => {
      displayFightActionsButtons(game.currentIndex, elements);
      hightlightCurrentPlayerPanel(game, elements)
    })
  });

  elements.player2DefendBtnElt.addEventListener("click", () => {
    game.currentPlayer.setDefense();
    displayShield(game.currentIndex, elements);
    game.changePlayer(() => {
      displayFightActionsButtons(game.currentIndex, elements);
      hightlightCurrentPlayerPanel(game, elements)
    })
  });

  elements.player1FightBtnElt.addEventListener("click", () => {
    game.currentPlayer.fight(game.players[1], () => {
      if (game.players[1].life <= 0) {
        game.players[1].life = 0;
        displayModal(game, elements);
      }
      display(game, elements);
      refreshLifeBar(game);
      game.changePlayer();
      displayFightActionsButtons(game.currentIndex, elements);
      hightlightCurrentPlayerPanel(game, elements)
    });
  });

  elements.player2FightBtnElt.addEventListener("click", () => {
    game.currentPlayer.fight(game.players[0], () => {
      if (game.players[0].life <= 0) {
        game.players[0].life = 0;
        displayModal(game, elements);
      }
      display(game, elements);
      refreshLifeBar(game);
      game.changePlayer();
      displayFightActionsButtons(game.currentIndex, elements);
      hightlightCurrentPlayerPanel(game, elements)
    });
  });

  // Modal button to start a new game
  elements.startNewGameBtnElt.addEventListener("click", function () {
    $("#modal").modal("hide");
    window.location.reload();
  });

  // Keyboard listener
  window.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "ArrowUp":
        game.movePlayerWithKeyboard("up", (fighting) => {
          display(game, elements);
          hightlightCurrentPlayerPanel(game, elements)
          displayNumberOfMovesCount(game, elements)
          if (fighting) {
            hideNumberOfMovesCount(elements)
            hideEndOfTurnButton(game.currentIndex, elements)
            displayFightActionsButtons(game.currentIndex, elements)
            return
          }
          displayEndOfTurnButton(game.currentIndex, elements);
        });
        break;

      case "ArrowRight":
        game.movePlayerWithKeyboard("right", (fighting) => {
          display(game, elements);
          hightlightCurrentPlayerPanel(game, elements)
          displayNumberOfMovesCount(game, elements)
          if (fighting) {
            hideNumberOfMovesCount(elements)
            hideEndOfTurnButton(game.currentIndex, elements)
            displayFightActionsButtons(game.currentIndex, elements)
            return
          }
          displayEndOfTurnButton(game.currentIndex, elements);
        });
        break;

      case "ArrowDown":
        game.movePlayerWithKeyboard("down", (fighting) => {
          display(game, elements);
          hightlightCurrentPlayerPanel(game, elements)
          displayNumberOfMovesCount(game, elements)
          if (fighting) {
            hideNumberOfMovesCount(elements)
            hideEndOfTurnButton(game.currentIndex, elements)
            displayFightActionsButtons(game.currentIndex, elements)
            return
          }
          displayEndOfTurnButton(game.currentIndex, elements);
        });
        break;

      case "ArrowLeft":
        game.movePlayerWithKeyboard("left", (fighting) => {
          display(game, elements);
          hightlightCurrentPlayerPanel(game, elements)
          displayNumberOfMovesCount(game, elements)
          if (fighting) {
            hideNumberOfMovesCount(elements)
            hideEndOfTurnButton(game.currentIndex, elements)
            displayFightActionsButtons(game.currentIndex, elements)
            return
          }
          displayEndOfTurnButton(game.currentIndex, elements);
        });

        break;

      default:
        break;
    }
  });
});
