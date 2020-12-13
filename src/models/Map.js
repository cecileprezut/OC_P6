const SIZE = 8;

const DEFAULT_WEAPON = new Weapon("Flower", 10, "../assets/flower.png");

const WEAPONS = [
  new Weapon("Rainbow", 20, "../assets/rainbow.png"),
  new Weapon("Cookie", 30, "../assets/cookie.png"),
  new Weapon("Teddy Bear", 40, "../assets/teddy_bear.png"),
];

class Map {
  constructor() {
    this.cells = [];

    if (SIZE % 4 !== 0 || (SIZE <= 4 && SIZE % 4 === 0)) {
      alert("SIZE doit être divisible par 4 et > 4");
      return;
    }

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        this.cells.push(new Cell(x, y));
      }
    }

    // On découpe en partie de 2 * 2 et on en prend une qu'on met a access false
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

    // On ajoute 1 arme par paquet de 9 cells
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
            // Chercher une arme random
            const weapon = WEAPONS[getRandomIndex(WEAPONS.length)];
            this.cells[index].addWeapon(weapon);
          }
        });
      }
    }
  }

  setPlayers(player1Name, player2Name) {
    const player1 = new Player(player1Name, 100, 0, 0, DEFAULT_WEAPON);
    const player2 = new Player(player2Name, 100, 0, 0, DEFAULT_WEAPON);

    // 0 <= Player 1.x < SIZE/4 && 0 <= Player 1.y < SIZE/4
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

    // SIZE - SIZE/4 <= Player2.x < SIZE && SIZE - SIZE/4 <= Player2.y < SIZE
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

  getPlayers() {
    const cellsWithPlayers = this.cells.filter((cell) => {
      return cell.player !== null;
    });
    return cellsWithPlayers.map((cell) => {
      return cell.player;
    });
  }

  getCell(x, y) {
    // Le HTML nous envoie des string
    const intX = parseInt(x);
    const intY = parseInt(y);

    return this.cells.find((cell) => {
      return cell.x === intX && cell.y === intY;
    });
  }

  // return true si déplacé sinon retourne false
  movePlayer(currentPlayer, x, y) {
    const targetCell = this.getCell(x, y);

    if (!targetCell) {
      return false;
    }

    // Pas vertical ou horizontal
    if (currentPlayer.x !== targetCell.x && currentPlayer.y !== targetCell.y) {
      return false;
    }
    // Même case que le joueur
    if (currentPlayer.x === targetCell.x && currentPlayer.y === targetCell.y) {
      return false;
    }

    // Horizontal droite
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

    // Horizontal gauche
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

    // Vertical haut
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

    // Vertical bas
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
