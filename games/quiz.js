const allQuestions = [
  {
    question: "Onde foi o nosso primeiro lugar juntos?",
    options: ["Na cafeteria", "Em casa", "No shopping", "Na estação do metrô"],
  },
  {
    question: "O que eu falo se tem papel na cama?",
    options: ["O que que é isso aqui hein?", "Minha cama é lixo agora?", "E esse papel de otário aqui que eu tô fazendo?", "Se cagou e se limpou sem eu notar, é?"],
  },
  {
    question: "Qual meu tipo de batata favorito?",
    options: ["Prussiana", "Portuguesa", "Frita", "Inglesa"],
  },
  {
    question: "Qual apelido eu mais te chamo?",
    options: ["Amor/amorzinho", "Vida", "Professora Atthie", "Alinda"],
  },
  {
    question: "Qual filme assistimos por último antes de começar a namorar?",
    options: ["Nope", "Mulan", "Alien", "A Chegada"],
  },
  {
    question: "Qual é a temperatura que eu deixo o ar condicionado?",
    options: ["23", "22", "20", "25"],
  },
  {
    question: "Qual o prato que eu mais gostei dos que a gente fez juntos?",
    options: ["Ovo de páscoa 1", "Ovo de páscoa 2", "Lasanha de molho branco", "Caramelo salgado"],
  },
  {
    question: "O que eu sinto com você?",
    options: ["Todas as outras", "Amor", "Paz", "Tesão ( ͡° ͜ʖ ͡°)"],
  },
  {
    question: "Qual minha série favorita das que assistimos juntos?",
    options: ["Casa do Dragão", "The Boys", "The Traitor", "Wandinha"],
  }
];

let quiz = [];
let current = 0;
let correctCount = 0;
let incorrectCount = 0;

function startQuiz() {
  quiz = shuffle([...allQuestions]).slice(0, 3);
  current = 0;
  correctCount = 0;
  incorrectCount = 0;
  document.getElementById("quizBox").classList.remove("hidden");
  document.getElementById("victorySection").classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  const q = quiz[current];
  document.getElementById("questionText").textContent = q.question;

  const optionsEl = document.getElementById("optionsContainer");
  optionsEl.innerHTML = "";

  const shuffledOptions = shuffle([...q.options]);
  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.options[0]);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    correctCount++;
  } else {
    incorrectCount++;
  }

  current++;
  if (current < quiz.length) {
    showQuestion();
  } else {
    evaluateQuiz();
  }
}

function evaluateQuiz() {
  if (correctCount >= 2) {
    finishQuiz();
  } else {
    const box = document.getElementById("quizBox");
    const err = document.createElement("p");
    err.textContent = "Você errou demais, safada! Vamos tentar de novo...";
    err.className = "quiz-error";
    box.appendChild(err);
    setTimeout(() => err.remove(), 3000);
    startQuiz();
  }
}

function finishQuiz() {
  markGameCompleted("quiz");
  document.getElementById("quizBox").classList.add("hidden");
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

window.addEventListener("DOMContentLoaded", startQuiz);