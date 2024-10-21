const createGame = (() => {
  // define variables
  const X_CLASS = "x";
  const O_CLASS = "o";
  let xTurn = true;
  let xScore = 0;
  let oScore = 0;
  let tieScore = 0;
  let playerXName, playerOName;
  let currentClass, CurrentPlayerName;
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

  const winningMessagePage = document.getElementById("winning-message");
  const congratulationsElement = document.getElementById("congratulation");
  const winningMessageElement = document.getElementById("winning-text");

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
    setPlayersName();
    setCurrentValues();
    updateScorePage();
    updateTurnIndicator();
    // Hide start page and show game page
    startPage.style.display = "none";
    gamePage.style.display = "flex";
  }

  function setPlayersName() {
    playerXName = playerXInput.value.toUpperCase() || "PLAYER X";
    playerOName = playerOInput.value.toUpperCase() || "PLAYER O";
  }

  function setCurrentValues() {
    CurrentPlayerName = xTurn ? playerXName : playerOName;
    currentClass = xTurn ? X_CLASS : O_CLASS;
  }

  function updateScorePage() {
    playerXScoreElement.textContent = `${playerXName}: ${xScore}`;
    playerOScoreElement.textContent = `${playerOName}: ${oScore}`;
    tieScoreElement.textContent = `TIES: ${tieScore}`;
  }

  function updateTurnIndicator() {
    turnIndicatorTextElement.textContent = `${CurrentPlayerName}'s Turn`;
  }

  // handle cell clicking
  function handleClick(event) {
    const cell = event.target;
    setCurrentValues();
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
      xTurn ? xScore++ : oScore++;
    } else if (isDraw()) {
      endGame(true);
      tieScore++;
    } else {
      switchTurns();
      setCurrentValues();
      updateTurnIndicator();
      setBoardHoverClass();
    }
    updateScorePage();
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
  function endGame(draw) {
    if (draw) {
      congratulationsElement.textContent = "Tight Game!!";
      winningMessageElement.textContent = `It's a Tie`;
      console.log("Draw");
    } else {
      congratulationsElement.textContent = "Congratulations!!";
      winningMessageElement.textContent = `${CurrentPlayerName} wins!`;
    }
    displayWinningMessagePage();
  }

  // check for draw
  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      );
    });
  }

  // Display winning message page
  function displayWinningMessagePage() {
    winningMessagePage.style.display = "flex";
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
