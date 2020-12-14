const SIZE = 12;

const DEFAULT_WEAPON = new Weapon("Flower", 10, "../assets/flower.png");

const WEAPONS = [
  new Weapon("Rainbow", 20, "../assets/rainbow.png"),
  new Weapon("Cookie", 30, "../assets/cookie.png"),
  new Weapon("Teddy Bear", 40, "../assets/teddy_bear.png"),
];

/**
 * Generates the map (array of objects) according to SIZE
 */
class Map {
  constructor() {
    this.cells = [];

    if (SIZE % 4 !== 0 || (SIZE <= 4 && SIZE % 4 === 0)) {
      alert("SIZE must be divisible by 4 and greater than 4.");
      return;
    }

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        this.cells.push(new Cell(x, y));
      }
    }

    // The map is cut is 2*2 cell packs. For each pack, one or zero random cell gets a block.
    for (let x = 0; x < SIZE; x += 2) {
      for (let y = 0; y < SIZE; y += 2) {
        const pack = this.cells.filter((cell) => {
          return (
            (cell.x === x && cell.y === y) ||
            (cell.x === x + 1 && cell.y === y) ||
            (cell.x === x && cell.y === y + 1) ||
            (cell.x === x + 1 && cell.y === y + 1)
          );
        });

        if (getRandomBool(0.6)) {
          const randomIndex = getRandomIndex(pack.length);
          const cellToEdit = pack[randomIndex];

          this.cells.forEach((cell) => {
            if (cell.x === cellToEdit.x && cell.y === cellToEdit.y) {
              cell.setBlocked();
            }
          });
        }
      }
    }

    // The map is cut is 3*3 cell packs. For each pack, one random cell gets a weapon, chosen randomly in the WEAPONS array. 
    // If the cell already has a block or a player, the weapon is not added.
    for (let x = 0; x < SIZE; x += 3) {
      for (let y = 0; y < SIZE; y += 3) {
        const pack = this.cells.filter((cell) => {
          return (
            (cell.x === x && cell.y === y) ||
            (cell.x === x + 1 && cell.y === y) ||
            (cell.x === x + 2 && cell.y === y) ||
            (cell.x === x && cell.y === y + 1) ||
            (cell.x === x + 1 && cell.y === y + 1) ||
            (cell.x === x + 2 && cell.y === y + 1) ||
            (cell.x === x && cell.y === y + 2) ||
            (cell.x === x + 1 && cell.y === y + 2) ||
            (cell.x === x + 2 && cell.y === y + 2)
          );
        });

        const randomIndex = getRandomIndex(pack.length);
        const cellToAddWeapon = pack[randomIndex];

        this.cells.forEach((cell, index) => {
          if (
            cell.x === cellToAddWeapon.x &&
            cell.y === cellToAddWeapon.y &&
            cell.block === false
          ) {
            const weapon = WEAPONS[getRandomIndex(WEAPONS.length)];
            this.cells[index].addWeapon(weapon);
          }
        });
      }
    }
  }
  /**
   * Randomly sets each player in a pack of cell which size depends on SIZE
   * @param {string} player1Name
   * @param {string} player2Name
   */
  setPlayers(player1Name, player2Name) {
    const player1 = new Player(player1Name, 100, 0, 0, DEFAULT_WEAPON);
    const player2 = new Player(player2Name, 100, 0, 0, DEFAULT_WEAPON);

    // Pack of cell to add player 1: 0 <= Player 1.x < SIZE/4 && 0 <= Player 1.y < SIZE/4
    let cellsForPlayer = this.cells.filter((cell) => {
      return (
        cell.x >= 0 &&
        cell.x < SIZE / 4 &&
        cell.y >= 0 &&
        cell.y < SIZE / 4 &&
        !cell.block &&
        !cell.weapon
      );
    });
    let randomIndex = getRandomIndex(cellsForPlayer.length);
    this.cells.forEach((cell, index) => {
      if (
        cell.x === cellsForPlayer[randomIndex].x &&
        cell.y === cellsForPlayer[randomIndex].y
      ) {
        this.cells[index].addPlayer(player1);
      }
    });

    // Pack of cell to add player 2: SIZE - SIZE/4 <= Player2.x < SIZE && SIZE - SIZE/4 <= Player2.y < SIZE
    cellsForPlayer = this.cells.filter((cell) => {
      return (
        cell.x >= SIZE - SIZE / 4 &&
        cell.x < SIZE &&
        cell.y >= SIZE - SIZE / 4 &&
        cell.y < SIZE &&
        !cell.block &&
        !cell.weapon
      );
    });
    randomIndex = getRandomIndex(cellsForPlayer.length);
    this.cells.forEach((cell, index) => {
      if (
        cell.x === cellsForPlayer[randomIndex].x &&
        cell.y === cellsForPlayer[randomIndex].y
      ) {
        this.cells[index].addPlayer(player2);
      }
    });
  }

  /**
   * Retrieves the cells with players
   * @returns {Object[]} an array of the Players
   */
  getPlayers() {
    const cellsWithPlayers = this.cells.filter((cell) => {
      return cell.player !== null;
    });
    return cellsWithPlayers.map((cell) => {
      return cell.player;
    });
  }


  /**
   * 
   * @param {(string|number)} x x coordinate of the td clicked
   * @param {(string|number)} y y coordinate of the td clicked
   * @returns {Object} Cell
   */
  getCell(x, y) {
    // The HTML sends strings
    const intX = parseInt(x);
    const intY = parseInt(y);

    return this.cells.find((cell) => {
      return cell.x === intX && cell.y === intY;
    });
  }

  /**
   * 
   * @param {Object} currentPlayer 
   * @param {(string|number)} x x coordinate of the td clicked
   * @param {(string|number)} y y coordinate of the td clicked
   * @returns {boolean} true is the player has moved, otherwise returns false
   */
  movePlayer(currentPlayer, x, y) {
    const targetCell = this.getCell(x, y);

    if (!targetCell) {
      return false;
    }

    // The move is neither vertical nor horizontal
    if (currentPlayer.x !== targetCell.x && currentPlayer.y !== targetCell.y) {
      return false;
    }
    // If the currentPlayer is on the cell
    if (currentPlayer.x === targetCell.x && currentPlayer.y === targetCell.y) {
      return false;
    }

    // Horizontal to the right
    if (currentPlayer.y === targetCell.y && currentPlayer.x < targetCell.x) {
      const distance = Math.abs(targetCell.x - currentPlayer.x);

      for (let i = 1; i <= distance; i++) {
        const cellX = currentPlayer.x + i;
        const cellY = currentPlayer.y;

        const cell = this.getCell(cellX, cellY);
        if (!cell.playerCanMoveTo(currentPlayer)) {
          return false;
        }
      }

      for (let j = 1; j <= distance; j++) {
        const cellX = currentPlayer.x + 1;
        const cellY = currentPlayer.y;

        const cell = this.getCell(cellX, cellY);
        const oldCell = this.getCell(currentPlayer.x, currentPlayer.y);
        cell.addPlayer(currentPlayer, oldCell);

        const index = this.cells.findIndex((cell) => {
          return cell.x === currentPlayer.x && cell.y === currentPlayer.y;
        });

        this.cells[index] = cell;
      }
      return true;
    }

    // Horizontal to the left
    if (currentPlayer.y === targetCell.y && currentPlayer.x > targetCell.x) {
      const distance = Math.abs(targetCell.x - currentPlayer.x);
      for (let i = 1; i <= distance; i++) {
        const cellX = currentPlayer.x - i;
        const cellY = currentPlayer.y;

        const cell = this.getCell(cellX, cellY);
        if (!cell.playerCanMoveTo(currentPlayer)) {
          return false;
        }
      }

      for (let j = 1; j <= distance; j++) {
        const cellX = currentPlayer.x - 1;
        const cellY = currentPlayer.y;

        const cell = this.getCell(cellX, cellY);
        const oldCell = this.getCell(currentPlayer.x, currentPlayer.y);
        cell.addPlayer(currentPlayer, oldCell);

        const index = this.cells.findIndex((cell) => {
          return cell.x === currentPlayer.x && cell.y === currentPlayer.y;
        });
        this.cells[index] = cell;
      }
      return true;
    }

    // Vertical to the top
    if (currentPlayer.y > targetCell.y && currentPlayer.x === targetCell.x) {
      const distance = Math.abs(targetCell.y - currentPlayer.y);
      for (let i = 1; i <= distance; i++) {
        const cellX = currentPlayer.x;
        const cellY = currentPlayer.y - i;

        const cell = this.getCell(cellX, cellY);
        if (!cell.playerCanMoveTo(currentPlayer)) {
          return false;
        }
      }

      for (let j = 1; j <= distance; j++) {
        const cellX = currentPlayer.x;
        const cellY = currentPlayer.y - 1;

        const cell = this.getCell(cellX, cellY);
        const oldCell = this.getCell(currentPlayer.x, currentPlayer.y);
        cell.addPlayer(currentPlayer, oldCell);

        const index = this.cells.findIndex((cell) => {
          return cell.x === currentPlayer.x && cell.y === currentPlayer.y;
        });
        this.cells[index] = cell;
      }
      return true;
    }

    // Vertical to the bottom
    if (currentPlayer.y < targetCell.y && currentPlayer.x === targetCell.x) {
      const distance = Math.abs(targetCell.y - currentPlayer.y);
      for (let i = 1; i <= distance; i++) {
        const cellX = currentPlayer.x;
        const cellY = currentPlayer.y + i;

        const cell = this.getCell(cellX, cellY);
        if (!cell.playerCanMoveTo(currentPlayer)) {
          return;
        }
      }

      for (let j = 1; j <= distance; j++) {
        const cellX = currentPlayer.x;
        const cellY = currentPlayer.y + 1;

        const cell = this.getCell(cellX, cellY);
        const oldCell = this.getCell(currentPlayer.x, currentPlayer.y);
        cell.addPlayer(currentPlayer, oldCell);

        const index = this.cells.findIndex((cell) => {
          return cell.x === currentPlayer.x && cell.y === currentPlayer.y;
        });
        this.cells[index] = cell;
      }
      return true;
    }
  }

  /**
   * 
   * @param {Object} currentPlayer 
   * @returns {boolean} true if a cell next to the currentPlayer has a player
   */
  hasAdjacentPlayer(currentPlayer) {
    const cellsAroundPlayer = this.cells.filter((cell) => {
      return (
        (cell.x === currentPlayer.x && cell.y === currentPlayer.y - 1) ||
        (cell.x === currentPlayer.x + 1 && cell.y === currentPlayer.y) ||
        (cell.x === currentPlayer.x && cell.y === currentPlayer.y + 1) ||
        (cell.x === currentPlayer.x - 1 && cell.y === currentPlayer.y)
      );
    });

    const cellWithPlayer = cellsAroundPlayer.filter((cell) => {
      return !!cell.player;
    });

    return cellWithPlayer.length > 0;
  }
}
