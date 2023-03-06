
const statusDisplay = document.querySelector('.game-status');

// Used to stop the game when a scenario occurs
let gameActive = true;

// Store current player
let currentPlayer = "X"; 

// Store game state in empty strings in the form of an array
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning statement
const winningMessage = () => `Player ${currentPlayer} has won!`;

// Game Draw
const drawMessage = () => `Game ended in a draw!`;

// Game Turn
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = 
    [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

function computerTurn() {

    let randNum = Math.floor(Math.random() * 9) + 0;

    ///const sum = parseInt(clickedCell.getAttribute('data-cell-index'));

    const cpuCell = document.querySelector('.game-container');
    cpuCell.getAttribute('data-cell-index');

    if (randNum == cpuCell) {
        cpuCell.innerHTML = "O"
    }

    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];

        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    console.log(randNum);
}

function cellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}

function playerChange() {

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
        computerTurn();
        console.log("It's the computer's turn")
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function resultValidation() {

    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];

        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");

    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

function cellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

function restartGame() {
    location.reload();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick)); 
