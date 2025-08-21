// main.js
// This file sets up and starts the games.
const Game = require("./game.js");
const Player = require('./player.js');

// Create two game instances with different grid sizes.
const game1 = Game.create(20, 20)
// const game2 = Game.create(4, 4);

// Create four independent player instances with names.
const playerA = Player.create('A');
const playerB = Player.create('B');
// const playerC = Player.create('C');
// const playerD = Player.create('D');


// Add players to their respective games.
game1.addPlayer(playerA);
game1.addPlayer(playerB);

// game2.addPlayer(playerC);
// game2.addPlayer(playerD);

const allGames = [game1];

// Start the game loop.
const gameInterval = setInterval(() => {
    // Flag to check if any game is still in progress.
    let gamesInProgress = false;

    allGames.forEach(game => {
        // If the game is still running, execute a turn and print the grid.
        if (!game.isOver) {
            game.runTurn();
            game.printGrid();
            gamesInProgress = true;
        } else if (!game.printedResult) {
            // If the game is over and the result hasn't been printed yet, do so now.
            console.log(`\n--- Game ${game.id} Final Result ---`);
            console.log(game.getFinalResult());
            console.log(`-----------------------------------`);
            game.printedResult = true;
        }
    });

    // If all games have finished, stop the interval and exit.
    if (!gamesInProgress && allGames.every(g => g.printedResult)) {
        console.log("All games have finished.");
        clearInterval(gameInterval);
    }
}, 1000); // Run a game turn every 5 seconds.