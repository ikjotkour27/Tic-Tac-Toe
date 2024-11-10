const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Start the game initially
startGame();

function startGame() {
  // Reset the board and remove any previous marks
  cells.forEach(cell => {
    cell.classList.remove('x', 'o'); // Remove all marks
    cell.textContent = ''; // Clear cell content
    cell.addEventListener('click', handleClick, { once: true }); // Add event listener again
  });
  isXTurn = true; // Reset turn to 'X'
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  placeMark(cell, currentClass);
  
  if (checkWin(currentClass)) {
    setTimeout(() => endGame(false), 10); // Short delay to allow mark to display
  } else if (isDraw()) {
    setTimeout(() => endGame(true), 10);
  } else {
    isXTurn = !isXTurn; // Switch turns
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  if (draw) {
    alert('Draw!');
  } else {
    alert(`${isXTurn ? 'X' : 'O'} Wins!`);
  }
  startGame(); // Restart the game after showing the result
}

// Attach the restart function to the restart button
restartButton.addEventListener('click', startGame);
