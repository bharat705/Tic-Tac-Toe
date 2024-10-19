const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [2, 4, 6],
  [0, 4, 8],
  [6, 7, 8],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
let xTurn;

startGame();

function startGame() {
  xTurn = true;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    // winningMessageElement.innerText = "Draw!"
  } else {
    // winningMessageElement.innerText = `${currentClass} wins!`
  }
}

function isDraw() {
  return cellElements.every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function switchTurns() {
  xTurn = !xTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}
