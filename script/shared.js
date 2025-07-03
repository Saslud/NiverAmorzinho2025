// Inicializa progresso a partir da sessão
function loadProgress() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("progress"));
    if (saved) {
      window.progress = saved;
    } else {
      window.progress = { memory: false, quiz: false, slider: false };
    }
  } catch {
    window.progress = { memory: false, quiz: false, slider: false };
  }
}

// Salva progresso na sessão
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(window.progress));
}

// Marca jogo como concluído e salva progresso
function markGameCompleted(gameKey) {
  if (window.progress.hasOwnProperty(gameKey)) {
    window.progress[gameKey] = true;
    saveProgress();
  }
}

// Verifica se todos os jogos foram concluídos
function allGamesCompleted() {
  return window.progress.memory && window.progress.quiz && window.progress.slider;
}

// Retorna lista de animais desbloqueados
function getUnlockedAnimals() {
  const unlocked = [];
  if (window.progress.memory) unlocked.push("capybara");
  if (window.progress.quiz) unlocked.push("duck");
  if (window.progress.slider) unlocked.push("moo");
  return unlocked;
}

// Inicia carregamento do progresso ao importar este script
loadProgress();