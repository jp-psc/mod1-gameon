var playerC = "C";
var playerB = "B";
var currentPlayer = playerC;

var gameOver = false;
var theBlock;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    theBlock = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("theBlock").append(tile);
        }
        theBlock.push(row);
    }
}