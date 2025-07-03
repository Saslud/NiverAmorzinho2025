const photos = [
  "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg",
  "foto6.jpg", "foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg"
];

const gridSize = 3;
let tiles = [];
let emptyIndex = 8;
let image;

function startGame() {
  image = `../assets/images/memories/${randomImage()}`;
  tiles = Array.from({ length: 8 }, (_, i) => i + 1);
  tiles.push(null);
  shufflePuzzle();
  renderGrid();
}

function randomImage() {
  return photos[Math.floor(Math.random() * photos.length)];
}

function shufflePuzzle() {
  do {
    tiles = shuffle([...tiles]);
  } while (!isSolvable(tiles));
  emptyIndex = tiles.indexOf(null);
}

function renderGrid() {
  const board = document.getElementById("puzzleBoard");
  board.innerHTML = "";

  tiles.forEach((tile, i) => {
    const div = document.createElement("div");
    div.classList.add("slider-tile");
    if (tile === null) {
      div.classList.add("slider-empty");
    } else {
      const row = Math.floor((tile - 1) / gridSize);
      const col = (tile - 1) % gridSize;
      div.style.backgroundImage = `url('${image}')`;
      div.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
      div.addEventListener("click", () => moveTile(i));
    }
    board.appendChild(div);
  });
}

function moveTile(index) {
  if (isAdjacent(index, emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    emptyIndex = index;
    renderGrid();
    if (isSolved()) finishPuzzle();
  }
}

function isAdjacent(i1, i2) {
  const row1 = Math.floor(i1 / gridSize);
  const col1 = i1 % gridSize;
  const row2 = Math.floor(i2 / gridSize);
  const col2 = i2 % gridSize;
  return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

function isSolved() {
  for (let i = 0; i < 8; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return true;
}

// Validação básica de solubilidade
function isSolvable(arr) {
  const inv = arr
    .filter(n => n !== null)
    .reduce((count, val, i, a) =>
      count + a.slice(i + 1).filter(n => n < val).length, 0);
  return inv % 2 === 0;
}

function finishPuzzle() {
  markGameCompleted("slider");
  document.getElementById("victorySection").classList.remove("hidden");
}

function goHome() {
  window.location.href = "../main.html";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("DOMContentLoaded", startGame);