let playerC = "C";
let playerB = "B";
let currentPlayer = playerC;

let gameOver = false;
let theBlock;

let currentColumns;

let rows = 6;
let columns = 7;

window.onload = function() {
    setPopoff();
}

function setPopoff() {
    theBlock = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("theBlock").append(tile);

            tile.addEventListener("click", setPiece);
        }
        theBlock.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coordinates = this.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);

    r = currentColumns[c];
    if (r < 0) {
        return;
    }

    theBlock[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerC) {
        tile.classList.add("blue-soldier");
        currentPlayer = playerB;
    }

    else {
        tile.classList.add("red-soldier");
        currentPlayer = playerC;
    }

    r -= 1; // This updates the row height for the column.
    currentColumns[c] = r; // This updates the array.

    checkWinner();
}

function checkWinner() {
    // This checks for four in a row horizontally starting from coordinates [0, 0], etc.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (theBlock[r][c] != ' ') {
                if (theBlock[r][c] == theBlock[r][c+1] && theBlock[r][c+1] == theBlock[r][c+2] && theBlock[r][c+2] == theBlock[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // This checks for four in a row vertically.
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (theBlock[r][c] != ' ') {
                if (theBlock[r][c] == theBlock[r+1][c] && theBlock[r+1][c] == theBlock[r+2][c] && theBlock[r+2][c] == theBlock[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // This checks for four in a row diagonally -> \.
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (theBlock[r][c] != ' ') {
                if (theBlock[r][c] == theBlock[r+1][c+1] && theBlock[r+1][c+1] == theBlock[r+2][c+2] && theBlock[r+2][c+2] == theBlock[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // This checks for four in a row diagonally -> /.
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (theBlock[r][c] != ' ') {
                if (theBlock[r][c] == theBlock[r-1][c+1] && theBlock[r-1][c+1] == theBlock[r-2][c+2] && theBlock[r-2][c+2] == theBlock[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let theVictoriousOne = document.getElementById("theVictoriousOne");
    if (theBlock[r][c] == playerC) {
        theVictoriousOne.innerText = "C's Up!";
    } else {
        theVictoriousOne.innerText = "B's Up!";
    }

    gameOver = true;
}