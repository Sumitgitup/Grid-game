

class Player {
    constructor(name) {
        // The player's name, used for identification in the terminal output.
        this.name = name;
        // The player's current X and Y coordinates on the grid.
        this.x = -1;
        this.y = -1;
        // A flag to track if the player has been eliminated.
        this.isEliminated = false;
    }

    static create(name) {
        return new Player(name);
    }
}

module.exports = Player;