// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

const INLINE_TEST_QUESTIONS = [
{
  q: "What is the name of the highest court in Australia?",
  a: [
    "The High Court of Australia",
    "The Federal Court",
    "The Supreme Court"
  ],
  correct: 0
},
  {
    q: "Which level of government has responsibility for immigration and citizenship?",
    a: [
      "Federal government",
      "State governments",
      "Local councils"
    ],
    correct: 0
  },
  {
    q: "What is the role of the Governor-General?",
    a: [
      "To represent the King of Australia in Australia",
      "To lead the government",
      "To interpret the Constitution"
    ],
    correct: 0
  },
  {
    q: "Which of the following is required to change the Australian Constitution?",
    a: [
      "A referendum approved by the Australian people",
      "A decision by the High Court",
      "A vote by the Prime Minister"
    ],
    correct: 0
  },
  {
    q: "What does compulsory voting mean in Australia?",
    a: [
      "Eligible citizens must vote in federal and state elections",
      "Citizens must join a political party",
      "Citizens must vote for the winning party"
    ],
    correct: 0
  },
  {
    q: "Which statement best describes the separation of powers?",
    a: [
      "Law-making, law-executing and law-interpreting powers are separated",
      "The Prime Minister controls all branches of government",
      "The courts make laws when Parliament cannot"
    ],
    correct: 0
  },
  {
    q: "What is the role of the High Court of Australia?",
    a: [
      "To interpret and apply the law, including the Constitution",
      "To create new laws",
      "To manage elections"
    ],
    correct: 0
  },
  {
    q: "Which of the following is a responsibility of Australian citizens?",
    a: [
      "Serve on a jury if called",
      "Vote only in local elections",
      "Join the defence forces"
    ],
    correct: 0
  },
  {
    q: "Which group is recognised as the first inhabitants of Australia?",
    a: [
      "Aboriginal and Torres Strait Islander peoples",
      "European settlers",
      "Convicts from Britain"
    ],
    correct: 0
  },
  {
    q: "What does the term ‘the rule of law’ mean?",
    a: [
      "No one is above the law, including the government",
      "Only citizens must follow the law",
      "Courts can change laws freely"
    ],
    correct: 0
  },
  {
    q: "Which of these is an Australian democratic belief?",
    a: [
      "Freedom of speech within the law",
      "Freedom to ignore the law",
      "Freedom from all government authority"
    ],
    correct: 0
  },
  {
    q: "What is one responsibility of state and territory governments?",
    a: [
      "Schools and hospitals",
      "Foreign affairs",
      "Immigration policy"
    ],
    correct: 0
  },
  {
    q: "Which ocean is located to the east of Australia?",
    a: [
      "Pacific Ocean",
      "Indian Ocean",
      "Southern Ocean"
    ],
    correct: 0
  },
  {
    q: "What does ‘a fair go’ most closely mean in Australian society?",
    a: [
      "Equal opportunity for everyone",
      "Equal outcomes for everyone",
      "Special treatment for citizens"
    ],
    correct: 0
  },
  {
    q: "Who may propose a new law in the Australian Parliament?",
    a: [
      "A member of Parliament",
      "The High Court only",
      "The Governor-General only"
    ],
    correct: 0
  },
  {
    q: "What is the purpose of a secret ballot?",
    a: [
      "To ensure people can vote freely without pressure",
      "To speed up election results",
      "To prevent voting errors"
    ],
    correct: 0
  },
  {
    q: "Which of the following best describes freedom of religion in Australia?",
    a: [
      "People are free to follow any religion or none",
      "Only approved religions are allowed",
      "Religion must not be practised publicly"
    ],
    correct: 0
  },
  {
    q: "What is required of a person at an Australian citizenship ceremony?",
    a: [
      "To make the Australian Citizenship Pledge",
      "To pass another written test",
      "To sign the Constitution"
    ],
    correct: 0
  },
  {
    q: "Which level of government is responsible for local roads and waste collection?",
    a: [
      "Local government",
      "State government",
      "Federal government"
    ],
    correct: 0
  },
  {
    q: "Who appoints the Governor-General of Australia?",
    a: [
      "The King, on the advice of the Prime Minister",
      "The Australian Parliament",
      "The High Court"
    ],
    correct: 0
  }
];

// ----------------------------
// STATE
// ----------------------------
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let totalQuestions = INLINE_TEST_QUESTIONS.length;

let currentRow = 0;

// ----------------------------
// UI TARGETS
// ----------------------------
const container = document.getElementById("inline-test-questions");
const expandBtn = document.getElementById("inline-test-expand");

// ----------------------------
// PROGRESS DISPLAY
// ----------------------------
function updateProgressDisplay() {
  document.getElementById("inline-progress-text").textContent =
    `Progress: ${answeredCount} / ${totalQuestions} questions`;
}

function updateProgressBar() {
  const pct = (answeredCount / totalQuestions) * 100;
  document.getElementById("inline-progressbar").style.width = pct + "%";
}

// ----------------------------
// UTILITIES
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  question.a = combined.map(i => i.text);
  question.correct = combined.findIndex(i => i.isCorrect);
}

function createDonutChart() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const C = 2 * Math.PI * 40;

  return `
    <div class="donut-wrapper">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#ebe6ff" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#6d4aff" stroke-width="12" fill="none"
          stroke-dasharray="${(pct / 100) * C} ${(1 - pct / 100) * C}"
          transform="rotate(-90 50 50)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">${pct}%</div>
    </div>
  `;
}

function createEndCard() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const card = document.createElement("div");
  card.className = "inline-question-card end-card";

  const title =
    pct >= 80 ? "Excellent work!" :
    pct >= 50 ? "Good progress!" :
    pct >= 25 ? "A solid start" :
    "Keep practising";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
    <p>
      You’ve completed the free practice questions.<br>
      Get full access to <strong>hundreds of official-style Australian Citizenship Test questions</strong>,
      realistic exam simulations, and detailed explanations.
    </p>
    <a href="https://civiclearn.com/australia/checkout.html" class="hero-primary-btn">
      Get full access
    </a>
  `;

  return card;
}


// ----------------------------
// BUILD ROWS
// ----------------------------
const rows = [];
for (let i = 0; i < totalQuestions; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// RENDERING
// ----------------------------
function renderRow(rowIndex) {
  if (!rows[rowIndex]) return;

  rows[rowIndex].forEach((q, offset) => {
    const absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
    container.appendChild(createQuestionCard(q, absoluteIndex));
  });
}

function createQuestionCard(questionObj, absoluteIndex) {
  const card = document.createElement("div");
  card.className = "inline-question-card";

  const title = document.createElement("h3");
  title.textContent = questionObj.q;

  const feedback = document.createElement("div");
  feedback.className = "inline-feedback";

  card.append(title);

  questionObj.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "inline-option-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      answeredCount++;
      updateProgressDisplay();
      updateProgressBar();

      if (i === questionObj.correct) {
        correctCount++;
        feedback.textContent = "Correct!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        feedback.textContent =
          "Correct answer: " + questionObj.a[questionObj.correct];
        feedback.classList.add("inline-wrong");
      }

      card.querySelectorAll("button").forEach(b => (b.disabled = true));
      card.appendChild(feedback);

      const isLastQuestion = absoluteIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setTimeout(() => container.appendChild(createEndCard()), 300);
      }

      const isLastInRow =
        (absoluteIndex + 1) % QUESTIONS_PER_ROW === 0 &&
        absoluteIndex !== totalQuestions - 1;

      if (isLastInRow) {
        currentRow++;
        renderRow(currentRow);
      }
    };

    card.appendChild(btn);
  });

  return card;
}

// ----------------------------
// INITIAL RENDER
// ----------------------------
renderRow(0);
updateProgressDisplay();
updateProgressBar();

// ----------------------------
// CONTINUE BUTTON
// ----------------------------
expandBtn.onclick = () => {
  currentRow = 1;
  renderRow(currentRow);
  expandBtn.style.display = "none";
};
