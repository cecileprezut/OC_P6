const MAX_MOVE = 3;

/**
 * The map generation is embedded in the Game class
 */
class Game {
  constructor() {
    this.currentIndex = 0;
    this.map = new Map();
    this.map.setPlayers("Cecile", "Damien");
    this.players = this.map.getPlayers();
    this.currentPlayer = this.players[this.currentIndex];

    // Properties related to keyboard moves
    this.currentKeyboardDirection = "";
    this.keyboardInputCount = 0;

    this.fighting = false;
  }

  /**
   * This method sets the currentPlayer according to the currentIndex
   * @param {requestCallback} cb Allows to call some other functions (mostly display-related ones) once the player is changed
   */
  changePlayer(cb) {
    this.currentIndex++;
    if (!this.players[this.currentIndex]) {
      this.currentIndex = 0;
    }

    this.currentPlayer = this.players[this.currentIndex];
    // If the currentPlayer had previously defended himself
    this.currentPlayer.unsetDefense()
    this.currentKeyboardDirection = "";
    this.keyboardInputCount = 0;

    if (cb) {
      cb()
    }
  }

  /**
   * 
   * @param {(string|number)} x x coordinate of the td clicked
   * @param {(string|number)} y y coordinate of the td clicked
   * @param {requestCallback} cb Allows to call display-related functions when the player has moved or is next to the other player
   */
  movePlayerWithMouse(x, y, cb) {
    if (this.fighting) return;

    // If the player has moved using the keyboard in the same turn
    if (this.keyboardInputCount > 0) return;

    // If the cell is at more than MAX_MOVE from the player cell
    if (Math.abs(x - this.currentPlayer.x) > MAX_MOVE || Math.abs(y - this.currentPlayer.y) > MAX_MOVE) return


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
   * @param {('up' |'right' |'down' | 'left')} direction Is the direction asked by the user through the keyboard
   * @param {requestCallback} cb Allows to call display-related functions when the player has moved or is next to the other player
   */
  movePlayerWithKeyboard(direction, cb) {
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

    if (!hasMoved && this.keyboardInputCount === 0) {
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
