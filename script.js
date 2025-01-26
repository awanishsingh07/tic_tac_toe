const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(event) {
  const index = event.target.dataset.index;
  if (!board[index]) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      message.textContent = `Player ${currentPlayer} wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (board.every(cell => cell)) {
      message.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick);
  });
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
}
