// Função de redirecionamento
function startGame(game) {
  switch (game) {
    case 'memory':
      window.location.href = 'games/memory.html';
      break;
    case 'quiz':
      window.location.href = 'games/quiz.html';
      break;
    case 'slider':
      window.location.href = 'games/slider.html';
      break;
  }
}

function showTemporaryMessage(msg) {
  const msgEl = document.createElement("div");
  msgEl.textContent = msg;
  msgEl.className = "temporary-msg";
  document.body.appendChild(msgEl);
  setTimeout(() => msgEl.remove(), 4000);
}

function makeDraggable(element) {
  let isDragging = false;

  const startDrag = (e) => {
    isDragging = true;
    element.style.cursor = 'grabbing';

    const move = (eMove) => {
      if (!isDragging) return;
      const x = eMove.clientX || eMove.touches?.[0]?.clientX;
      const y = eMove.clientY || eMove.touches?.[0]?.clientY;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    };

    const stopDrag = () => {
      isDragging = false;
      element.style.cursor = 'grab';
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stopDrag);
  };

  element.addEventListener('mousedown', (e) => {
    if (!isDragging) {
      startDrag(e);
    } else {
      isDragging = false;
    }
  });
}

function setInitialPosition(element, index) {
  const positions = [
    { left: '20%', top: '50%' },   // esquerda moderada
    { left: '50%', top: '20%' },   // topo central
    { left: '80%', top: '50%' },   // direita moderada
  ];

  const pos = positions[index] || { left: '50%', top: '50%' }; // fallback

  element.style.position = 'absolute';
  element.style.left = pos.left;
  element.style.top = pos.top;
  element.style.transform = 'translate(-50%, -50%)';
}

// Ao carregar a página principal
window.addEventListener("DOMContentLoaded", () => {
  const animalGrid = document.getElementById("animalImages");
  const rewardSection = document.getElementById("reward-section");
  const audioSection = document.getElementById("audioSection");

  const animals = getUnlockedAnimals();
  if (animals.length > 0) {
    rewardSection.classList.remove("hidden");
    animals.forEach((animal, index) => {
      const img = document.createElement("img");
      img.src = `assets/images/animals/${animal}.png`;
      img.alt = animal;
      img.classList.add("draggable-pet");
      document.body.appendChild(img); // pets agora fora da grid de recompensa
      makeDraggable(img);
      setInitialPosition(img, index);
    });

    showTemporaryMessage("Você completou o jogo! 🥳");
  }

  if (allGamesCompleted()) {
    audioSection.classList.remove("hidden");
  }
});