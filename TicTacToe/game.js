
function restartGame() {
    location.reload();
}

function multi() {

}

function single() {
    const ai_player = 'x';
    function emptySquares () {
        return origBoard.filter(item => typeof item === 'number');
    };
    function botSpot () {
        return emptySquares()[0];
    }
}