function restartGame() {
  // document.getElementById("start-page").style.display = "none";
  // document.getElementById("game-page").style.display = "none";
  document.getElementById("winning-message").style.display = "flex";
}

document.querySelector(".restart-btn").addEventListener("click", restartGame);

const createGame = (() => {
  // define variables
  const X_CLASS = "x";
  const O_CLASS = "o";
  let xTurn = true;
  let xScore = 0;
  let oScore = 0;
  let tieScore = 0;
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

  // cache DOM
  const startPage = document.getElementById("start-page");
  const gamePage = document.getElementById("game-page");

  const playerXInput = document.getElementById("playerX");
  const playerOInput = document.getElementById("playerO");
  const startPageStartBtn = document.querySelector(".start-btn");

  const board = document.getElementById("game-board");
  const cellElements = document.querySelectorAll("[data-cell]");
  const turnIndicatorTextElement = document.getElementById("turnIndicatorText");

  const playerXScoreElement = document.getElementById("playerXScore");
  const playerOScoreElement = document.getElementById("playerOScore");
  const tieScoreElement = document.getElementById("tieScore");

  startGame();

  // start game and add event listener to cells
  function startGame() {
    startPageStartBtn.addEventListener("click", displayGamePage);
    cellElements.forEach((cell) => {
      cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
  }

  // Display game page after taking the input
  function displayGamePage() {
    updateGamePage();
    // Hide start page and show game page
    startPage.style.display = "none";
    gamePage.style.display = "flex";
  }

  function updateGamePage() {
    const playerXName = playerXInput.value || "Player X";
    const playerOName = playerOInput.value || "Player O";
    playerXScoreElement.textContent = `${playerXName}: ${xScore}`;
    playerOScoreElement.textContent = `${playerOName}: ${oScore}`;
    tieScoreElement.textContent = `Ties: ${tieScore}`;
  }

  // handle cell clicking
  function handleClick(event) {
    const cell = event.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false, currentClass);
    } else if (isDraw()) {
      endGame(true);
    } else {
      switchTurns();
      setBoardHoverClass();
    }
  }

  // place marks while clicking
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  // check for win
  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }

  // end game
  function endGame(draw, currentClass) {
    if (draw) {
      // winningMessageElement.innerText = "Draw!"
      console.log("Draw");
    } else {
      // winningMessageElement.innerText = `${currentClass} wins!`
      console.log(`${currentClass} wins!`);
    }
  }

  // check for draw
  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      );
    });
  }

  // switch turns
  function switchTurns() {
    xTurn = !xTurn;
  }

  // make hovering effect
  function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (xTurn) {
      board.classList.add(X_CLASS);
    } else {
      board.classList.add(O_CLASS);
    }
  }
})();
