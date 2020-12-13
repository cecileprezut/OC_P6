class Cell {
  constructor(x, y, block = false) {
    this.x = x;
    this.y = y;
    this.block = block;
    this.weapon = null;
    this.player = null;
  }

  addWeapon(weapon){
    this.weapon = weapon
  }

  addPlayer(player,oldCell = null) {
    // Si le player a une arme on échange
    if (player.weapon && this.weapon) {
      let weaponToDrop = player.weapon;
      player.weapon = this.weapon;
      this.weapon = weaponToDrop;
    }

    player.x = this.x;
    player.y = this.y;
    this.player = player;

    if(oldCell){
        oldCell.player = null
    }
  }

  playerCanMoveTo(player) {
    // Si le joueur est déjà dans la case
    if (player.x === this.x && player.y === this.y) {
      return false;
    }
    if (this.block || this.player) {
      return false;
    }
    return true;
  }

  setBlocked(){
      this.weapon = null
      this.player = null
      this.block = true
  }

}
