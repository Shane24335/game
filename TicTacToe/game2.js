
const statusDisplay = document.querySelector('.game-status');

// Used to stop the game when a scenario occurs
let gameActive = true;

// Store current player
let currentPlayer = "X";

// Store game state in empty strings in the form of an array
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

// Winning statement
const winningMessage = () => `Player ${currentPlayer} has won!`;

// Game Draw
const drawMessage = () => `Game ended in a draw!`;

// Game Turn

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;


statusDisplay.innerHTML = currentPlayerTurn();

// Actual game functions
function cellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}

// 10 possible winning conditions in a 4x4 game
const winningConditions =
    [
        [0,   1,    2,   3],
        [4,   5,    6,   7],
        [8,   9,   10,  11],
        [12,  13,  14,  15],
        [0, 4, 8, 12],
        [0, 5, 10, 15],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [3, 6, 9, 12]
    ];

function playerChange() {

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();

}

function resultValidation() {

    let roundWon = false;

    for (let i = 0; i <= 9; i++) {
        
        const winCondition = winningConditions[i];

        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        let d = gameState[winCondition[3]];

        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }

        if (a === b && b === c && c === d) {
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