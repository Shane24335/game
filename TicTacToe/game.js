
const statusDisplay = document.querySelector('.game-status');

// Used to stop the game when a scenario occurs
let gameActive = true;

// Store current player
const playerCreator = {
    names: [
        playerOneName = document.getElementById("player1name"),
        playerTwoName = document.getElementById("player2name")
    ],
    scores: [
        playerOneScore = document.getElementById("playeronescore"),
        playerTwoScore = document.getElementById("playertwoscore")
    ],
    createPlayer(name) {
        return {
            name: name,
        }
    },
};

// Store game state in empty strings in the form of an array
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning statement
const winningMessage = () => `Player ${currentPlayer} has won!`;

// Game Draw
const drawMessage = () => `Game ended in a draw!`;

// Game Turn
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// Actual game functions
const rules = {
    cellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    },
    resultPopup(result, player) {
        let resultDivOverlay = document.createElement("div")
        resultDivOverlay.id = "resultdivoverlay"
        document.body.appendChild(resultDivOverlay)
        let resultDiv = document.createElement("div");
        resultDiv.id = "resultdiv"
        resultDivOverlay.appendChild(resultDiv)
        let resultDivTitleBar = document.createElement("div")
        resultDivTitleBar.id = "resultdivtitlebar"
        resultDiv.appendChild(resultDivTitleBar)
        let resultDivTitle = document.createElement("span")
        resultDivTitle.id = "resultdivtitle"
        resultDivTitle.innerHTML = "RESULT"
        resultDivTitleBar.appendChild(resultDivTitle)
        let resultDivContent = document.createElement("div")
        resultDivContent.id = "resultdivcontent"
        resultDivContent.innerHTML = ""
        resultDiv.appendChild(resultDivContent)
        let resultButton = document.createElement("button")
        resultButton.id = "resultbutton"
        resultButton.type = "button"
        resultButton.innerHTML = "OK"
        resultDiv.appendChild(resultButton)
        resultButton.addEventListener("click", () => {
            document.body.removeChild(resultDivOverlay)
            restartGame()
        });
        if (result === "win") {
            resultDivContent.innerHTML = player + " WINS"
        } else if (result === "draw") {
            resultDivContent.innerHTML = "DRAW"
        };
    }
}

const gameBoard = {
    board: document.getElementsByClassName("cell"),
    boxes: [
        cell0 = document.getElementById("cell0"),
        cell1 = document.getElementById("cell1"),
        cell2 = document.getElementById("cell2"),
        cell3 = document.getElementById("cell3"),
        cell4 = document.getElementById("cell4"),
        cell5 = document.getElementById("cell5"),
        cell6 = document.getElementById("cell6"),
        cell7 = document.getElementById("cell7"),
        cell8 = document.getElementById("cell8"),
    ]
}

// 8 possible winning conditions
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

function playerChange() {

    currentPlayer = currentPlayer === "X" ? "O" : "X";
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
            break
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

function cpuMoves() {
    function computerPlay() {
        let random = [
            gameBoard.cell[0], gameBoard.cell[1], gameBoard.cell[2],
            gameBoard.cell[3], gameBoard.cell[4], gameBoard.cell[5],
            gameBoard.cell[6], gameBoard.cell[7], gameBoard.cell[8]
        ];
        let randomBox = random[Math.random() * random.length];
        if (
            gameBoard.cell[0].innerHTML !== "" && gameBoard.cell[0].innerHTML !== "" && gameBoard.cell[0].innerHTML !== "" &&
            gameBoard.cell[0].innerHTML !== "" && gameBoard.cell[0].innerHTML !== "" && gameBoard.cell[0].innerHTML !== "" &&
            gameBoard.cell[0].innerHTML !== "" && gameBoard.cell[0].innerHTML !== "" && gameBoard.cell[0].innerHTML !== "") {
            return
        } else if (randomBox.innerHTML == "X" || randomBox.innerHTML == "0") {
            computerPlay()
        } else if (randomBox.innerHTML == "") {
            randomBox.innerHTML = "O"
        }
    }
    for (let i = 0; i < gameBoard.board.length; i++) {
        gameBoard.board[i].addEventListener("click", function move2() {
            if(gameBoard.board[i].innerHTML == "") {
                gameBoard.board[i].innerHTML= "X"
                computerPlay()
            } else return

        })
        
    }
}
