const MAX_MOVE = 3;

class Game {
  constructor() {
    this.currentIndex = 0;
    this.map = new Map();
    this.map.setPlayers("Cecile", "Damien");
    this.players = this.map.getPlayers();
    this.currentPlayer = this.players[this.currentIndex];

    // Permet de gérer les déplacement clavier
    this.currentKeyboardDirection = "";
    this.keyboardInputCount = 0;

    this.fighting = false;
  }

  changePlayer(cb) {
    this.currentIndex++;
    if (!this.players[this.currentIndex]) {
      this.currentIndex = 0;
    }

    this.currentPlayer = this.players[this.currentIndex];
    this.currentPlayer.unsetDefense()
    this.currentKeyboardDirection = "";
    this.keyboardInputCount = 0;

    if(cb){
      cb()
    }
  }

  movePlayerWithMouse(x, y,cb) {
    if (this.fighting) return;

    // Si il s'est déjà déplacé avec le clavier
    if (this.keyboardInputCount > 0) return;

    // si case a plus de MAX_MOVE de distance
    if(Math.abs(x - this.currentPlayer.x) > MAX_MOVE || Math.abs(y  - this.currentPlayer.y) > MAX_MOVE) return


    const hasMoved = this.map.movePlayer(this.currentPlayer, x, y);

    if (this.map.hasAdjacentPlayer(this.currentPlayer)) {
      this.fighting = true;
      this.changePlayer();
      cb('fighting')
      return
    }

    if (hasMoved) {
      this.changePlayer();
      cb()
    }
  }

  /**
   *
   * @param {('up' |'right' |'down' | 'left')} direction
   */
  movePlayerWithKeyboard(direction,cb) {
    if (this.fighting) return;

    if (
      this.currentKeyboardDirection &&
      this.currentKeyboardDirection !== direction
    ) {
      return;
    }
    if (this.keyboardInputCount >= MAX_MOVE) {
      return;
    }

    this.currentKeyboardDirection = direction;
    let x = 0;
    let y = 0;

    switch (direction) {
      case "up":
        x = this.currentPlayer.x;
        y = this.currentPlayer.y - 1;
        break;
      case "right":
        x = this.currentPlayer.x + 1;
        y = this.currentPlayer.y;
        break;
      case "down":
        x = this.currentPlayer.x;
        y = this.currentPlayer.y + 1;
        break;
      case "left":
        x = this.currentPlayer.x - 1;
        y = this.currentPlayer.y;
        break;
      default:
        console.error(`Invalid value for direction ${direction}`);
        break;
    }

    const hasMoved = this.map.movePlayer(this.currentPlayer, x, y);

    if (hasMoved) {
      this.keyboardInputCount++;
      cb()
    }

    if(!hasMoved && this.keyboardInputCount === 0){
      this.currentKeyboardDirection = ''
    }

    if (this.map.hasAdjacentPlayer(this.currentPlayer)) {
      this.fighting = true;
      this.changePlayer();
      cb('fighting')
      return
    }
  }
}
