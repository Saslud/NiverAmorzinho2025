const photos = [
  "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg",
  "foto6.jpg", "foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg"
];

const board = document.getElementById("gameBoard");
let firstCard = null;
let lock = false;
let matchesFound = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupGame() {
  const selectedPhotos = shuffle([...photos]).slice(0, 6);
  const cardPhotos = shuffle([...selectedPhotos, ...selectedPhotos]); // 6 pares

  cardPhotos.forEach((photo, index) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    const inner = document.createElement("div");
    inner.classList.add("memory-card-inner");

    const front = document.createElement("div");
    front.classList.add("memory-face", "front-face");
    front.textContent = "💗";

    const back = document.createElement("div");
    back.classList.add("memory-face", "back-face");
    const img = document.createElement("img");
    img.src = `../assets/images/memories/${photo}`;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.dataset.photo = photo;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lock || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    lock = true;
    const secondCard = card;

    const match = firstCard.dataset.photo === secondCard.dataset.photo;
    if (match) {
      matchesFound++;
      firstCard = null;
      lock = false;
      if (matchesFound === 6) showVictory();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        lock = false;
      }, 1000);
    }
  }
}

function showVictory() {
  markGameCompleted("memory");
  document.getElementById("victorySection").classList.remove("hidden");
}

function goHome() {
  window.location.href = "../main.html";
}

window.addEventListener("DOMContentLoaded", setupGame);