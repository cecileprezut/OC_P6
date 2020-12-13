function loadElements() {
  return {
    mapElt: document.getElementById("map"),
    player1FightBtnElt: document.getElementById("player1FightBtn"),
    player2FightBtnElt: document.getElementById("player2FightBtn"),
    player1DefendBtnElt: document.getElementById("player1DefendBtn"),
    player2DefendBtnElt: document.getElementById("player2DefendBtn"),
    player1ShieldElt: document.getElementById("player1Shield"),
    player2ShieldElt: document.getElementById("player2Shield"),
    spanEltPlayer1LifeScore: document.getElementById("player1LifeScore"),
    spanEltPlayer2LifeScore: document.getElementById("player2LifeScore"),
    player1WeaponNameElt: document.getElementById("player1Weapon"),
    player2WeaponNameElt: document.getElementById("player2Weapon"),
    player1WeaponVisualElt: document.getElementById("player1WeaponVisual"),
    player2WeaponVisualElt: document.getElementById("player2WeaponVisual"),
    player1WeaponDamageElt: document.getElementById("player1WeaponDamage"),
    player2WeaponDamageElt: document.getElementById("player2WeaponDamage"),
    player1NameElt: document.getElementById("player1Name"),
    player2NameElt: document.getElementById("player2Name"),
    leftDivElt: document.getElementById("leftDiv"),
    rightDivElt: document.getElementById("rightDiv"),
    player1EndTurnElt: document.getElementById("player1EndTurn"),
    player2EndTurnElt: document.getElementById("player2EndTurn"),
    player1NumberOfMovesSpan: document.getElementById("player1NumberOfMoves"),
    player2NumberOfMovesSpan: document.getElementById("player2NumberOfMoves"),
    player1NumberOfMovesParagraphElt: document.getElementById(
      "player1NumberOfMovesParagraph"
    ),
    player2NumberOfMovesParagraphElt: document.getElementById(
      "player2NumberOfMovesParagraph"
    ),
    player1MovingMandatoryParagraph: document.getElementById(
      "player1MovingMandatory"
    ),
    player2MovingMandatoryParagraph: document.getElementById(
      "player2MovingMandatory"
    ),
    player1OneDirectionParagraph: document.getElementById(
      "player1OneDirection"
    ),
    player2OneDirectionParagraph: document.getElementById(
      "player2OneDirection"
    ),
    player1EndOfTurnWarning: document.getElementById("player1EndOfTurnWarning"),
    player2EndOfTurnWarning: document.getElementById("player2EndOfTurnWarning"),
    winnerNameElt : document.getElementById('winnerName'),
    startNewGameBtnElt : document.getElementById('startNewGameBtn')
  };
}
