let board, score, gameOver;
const boardSize = 4;

function startGame() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    score = 0;
    gameOver = false;
    document.getElementById("score").textContent = score;
    generateNewTile();
    generateNewTile();
    updateBoard();
}

function generateNewTile() {
    if (gameOver) return;

    const emptyCells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length === 0) {
        gameOver = true;
        alert("Game Over!");
        return;
    }

    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function updateBoard() {
    const gridContainer = document.getElementById("game-board");
    gridContainer.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.classList.add(`grid-item-${tile}`);
            if (tile !== 0) {
                gridItem.textContent = tile;
            }
            gridContainer.appendChild(gridItem);
        });
    });
}

function move(direction) {
    if (gameOver) return;
    let moved = false;

    if (direction === "up") {
        for (let col = 0; col < boardSize; col++) {
            const column = [];
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== 0) column.push(board[row][col]);
            }

            const newColumn = mergeColumn(column);
            newColumn.forEach((value, row) => {
                if (board[row][col] !== value) moved = true;
                board[row][col] = value;
            });
        }
    }

    // Repeat for "down", "left", "right" directions...
    // Similar code for handling all other movement directions

    if (moved) {
        generateNewTile();
        updateBoard();
    }
}

// Add event listeners for keypress to move tiles
document.addEventListener("keydown", (event) => {
    if (gameOver) return;

    switch (event.key) {
        case "ArrowUp":
            move("up");
            break;
        case "ArrowDown":
            move("down");
            break;
        case "ArrowLeft":
            move("left");
            break;
        case "ArrowRight":
            move("right");
            break;
        default:
            break;
    }
});

// Helper function for merging columns
function mergeColumn(column) {
    const newColumn = [];
    let skip = false;

    for (let i = 0; i < column.length; i++) {
        if (skip) {
            skip = false;
            continue;
        }

        if (i + 1 < column.length && column[i] === column[i + 1]) {
            newColumn.push(column[i] * 2);
            score += column[i] * 2;
            skip = true;
        } else {
            newColumn.push(column[i]);
        }
    }

    while (newColumn.length < boardSize) {
        newColumn.push(0);
    }

    document.getElementById("score").textContent = score;
    return newColumn;
}

startGame();
