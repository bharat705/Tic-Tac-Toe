const X_CLASS = "x";
const O_CLASS = "o";

const cellElements = document.querySelectorAll("[data-cell]");
let xTurn;
cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(event) {
  const cell = event.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  // Check for win
  // Check for draw
  // Switch turns
  switchTurns();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  xTurn = !xTurn;
}
