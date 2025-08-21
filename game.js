class Game {
  // A static counter to assign a unique ID to each game instance.
  static nextGameId = 1;
  constructor(n, m) {
    this.id = Game.nextGameId++;
    this.n = n;
    this.m = m;
    this.players = [];
    this.destination = this.generateRandomCoords();
    this.isOver = false;
    this.turn = 0;

    this.result = null;
    this.printedResult = false;

    console.log(`Game ${this.id} initialized: ${this.n}x${this.m} grid.`);
    console.log(
      `Game ${this.id} destination set to: (${this.destination.x}, ${this.destination.y})`
    );
  }

  static create(n, m) {
    return new Game(n, m);
  }

    addPlayer(player) {
        if (this.isOver) {
        console.log(`Game ${this.id}: Cannot add player. Game is over.`);
        return;
        }
        let startPos;
        do {
            startPos = this.generateRandomCoords();
        }
        
        // Ensure the starting position is not occupied by another player or the destination.
        while (
            this.isOccupied(startPos) ||
            (startPos.x === this.destination.x && startPos.y === this.destination.y)
        ) {
            // Assign the player to that position
            player.x = startPos.x;
            player.y = startPos.y;

             // Add this player to that game
            this.players.push(player);

            console.log(`Game ${this.id}: Player ${player.name} has joined at (${player.x}, ${player.y}).`);
        }  
            
    }

    runTurn() {
        if (this.isOver) return true;
        this.turn++;

        // All players move one square towards the destination.
        this.players.forEach((player) => {
        if (player.isEliminated) return;

        const dx = this.destination.x - player.x;
        const dy = this.destination.y - player.y;

        // Move one square in the direction of the destination (horizontal, vertical, or diagonal).
        if (dx !== 0) player.x += Math.sign(dx);
        if (dy !== 0) player.y += Math.sign(dy);
        });

        // Array to hold collision groups
        let positions = [];

        // Step 1: Group players by coordinates
        this.players.forEach((player) => {
        if (player.isEliminated) return; // skip eliminated players

        const key = `${player.x},${player.y}`; // "x,y" string

        // Look for an existing group with the same position
        let group = positions.find((pos) => pos.key === key);

        if (!group) {
            // If not found, create a new group
            group = { key: key, players: [] };
            positions.push(group);
        }

        // Add player to this coordinate group
        group.players.push(player);
        });

        // Step 2: Check collisions
        positions.forEach((group) => {
        if (group.players.length > 1) {
            // More than one player at same position → collision
            const names = group.players.map((p) => p.name).join(" and ");
            console.log(
            `Game ${this.id}: Players ${names} were eliminated due to collision.`
            );

            // Eliminate all players in this group
            group.players.forEach((player) => {
            player.isEliminated = true;
            });
        }
        });

        // Check for a winner.
        const winner = this.players.find(
        (p) =>
            !p.isEliminated &&
            p.x === this.destination.x &&
            p.y === this.destination.y
        );
        if (winner) {
        this.isOver = true;
        this.result = `Winner: Player ${winner.name} reached the destination!`;
        return true;
        }

        // Check if the game is over due to all players being eliminated.
        if (this.players.every((p) => p.isEliminated)) {
        this.isOver = true;
        this.result = `Game Over: All players were eliminated.`;
        return true;
        }

        // If the game isn't over, return false.
        return false;
    }

    printGrid() {
        let grid = Array.from({ length: this.m }, () => Array(this.n).fill("_"));
        this.players.forEach((player) => {
        if (!player.isEliminated) {
            grid[player.x][player.y] = player.name;
        }
        });
        grid[this.destination.x][this.destination.y] = "X";

        console.log(
        `\nGame ${this.id} Turn ${this.turn.toString().padStart(3, "0")}:`
        );
        grid.forEach((row) => {
        console.log(row.join(" "));
        });
    }

  getFinalResult() {
    return this.result;
  }

  generateRandomCoords() {
    return {
      x: Math.floor(Math.random() * this.m),
      y: Math.floor(Math.random() * this.n),
    };
  }

  isOccupied(coords) {
    return this.players.some((p) => p.x === coords.x && p.y === coords.y);
  }
}

module.exports = Game;
