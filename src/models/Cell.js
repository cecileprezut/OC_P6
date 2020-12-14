/**
 * Cell class taking coordinates, and whether it has a block on it or not, as properties.
 */
class Cell {
  constructor(x, y, block = false) {
    this.x = x;
    this.y = y;
    this.block = block;
    this.weapon = null;
    this.player = null;
  }
  /**
   * 
   * @param {string} weapon 
   */
  addWeapon(weapon) {
    this.weapon = weapon
  }

  /**
   * 
   * @param {Object} player 
   * @param {*} oldCell is the cell on which the player previously was
   */
  addPlayer(player, oldCell = null) {
    // If the cell has a weapon, cell weapon and player's weapon are exchanged
    if (player.weapon && this.weapon) {
      let weaponToDrop = player.weapon;
      player.weapon = this.weapon;
      this.weapon = weaponToDrop;
    }

    player.x = this.x;
    player.y = this.y;
    this.player = player;

    if (oldCell) {
      oldCell.player = null
    }
  }
  /**
   * 
   * @param {Object} player
   */
  playerCanMoveTo(player) {
    // If the currentPlayer is on the cell
    if (player.x === this.x && player.y === this.y) {
      return false;
    }
    // If there is a block or another player on the cell
    if (this.block || this.player) {
      return false;
    }
    return true;
  }

  /**
   * allows to add a block to a cell
   */
  setBlocked() {
    this.weapon = null
    this.player = null
    this.block = true
  }

}
