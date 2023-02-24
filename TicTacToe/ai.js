
const currentPlayer = 'x'
const ai_player = '0';

function emptySquares () {
    return origBoard.filter(item => typeof item === 'number');
};

function botPicksSpot () {
    return minimax(origBoard, AI_PLAYER).index;
}

function minimax(newBoard, player) {
    let availableSpots = emptySquares();
      
    if (onCheckWin(newBoard, currentPlayer)) {
        return { score: -10 }
    } else if (onCheckWin(newBoard, AI_PLAYER)) {
        return { score: 10 }
    } else if (availableSpots.length === 0) {
        return { score: 0 }
    }
      
    let moves = [];
      
    for (let i=0; i<availableSpots.length; i++) {
        let move = {};
        move.index = newBoard[availableSpots[i]];
        newBoard[availableSpots[i]] = player;
      
        if (player === AI_PLAYER) {
            let result = minimax(newBoard, currentPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, AI_PLAYER);
            move.score = result.score;
        } // end of if/else block
        newBoard[availableSpots[i]] = move.index;
        moves.push(move);
    } // end of for look
      
    let bestMove;
      
    if (player === AI_PLAYER) {
        let bestScore = -10000;
        for (let i=0; i<moves.length; i++) {
            if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
        } // end of for loop
    } 
    else {
        let bestScore = 10000;
        for (let i=0; i<moves.length; i++) {
            if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
        }
    }
      
    return moves[bestMove];
} // end of minimax func()
      
