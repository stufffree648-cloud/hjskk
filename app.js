const tracks = [
  {
    title: 'General Chemistry Refresh',
    level: 'Semester 1 & 2',
    focus: ['Stoichiometry missions', 'Atomic structure games', 'Thermochemistry labs'],
    badge: 'Foundations'
  },
  {
    title: 'Organic Reaction Lab',
    level: 'Sophomore',
    focus: ['Mechanism drills', 'Synthesis puzzles', 'IR/NMR interpretation'],
    badge: 'Reactions'
  },
  {
    title: 'Physical Chemistry Sprint',
    level: 'Upper division',
    focus: ['Quantum visualizations', 'Partition functions', 'Free energy surfaces'],
    badge: 'Math heavy'
  },
  {
    title: 'Analytical & Instrumentation',
    level: 'Lab focused',
    focus: ['Spectroscopy workflows', 'Calibration stats', 'Electrochemistry labs'],
    badge: 'Lab pro'
  }
];

const leaderboard = [
  { name: 'Avery', xp: 1240, streak: 28 },
  { name: 'Luis', xp: 1185, streak: 22 },
  { name: 'Priya', xp: 1104, streak: 18 },
  { name: 'Noor', xp: 995, streak: 15 }
];

const questions = [
  {
    type: 'Concept',
    topic: 'Chemical Thermodynamics',
    text: 'For a reaction where ΔH < 0 and ΔS < 0, spontaneity depends primarily on…',
    options: [
      'Temperature: the reaction is spontaneous only at low T',
      'The reverse reaction rate only',
      'The catalyst used',
      'Pressure of gaseous reactants'
    ],
    answer: 0,
    hint: 'ΔG = ΔH − TΔS. Consider sign combinations.'
  },
  {
    type: 'Calculation',
    topic: 'Equilibrium',
    text: 'Given Kc = 4.0 for A ⇌ 2B at 298 K, what is Kp?',
    options: [
      '4.0 (no change because Δn = 0)',
      '16.0 because products are doubled',
      '2.0 because square root of Kc',
      'Cannot be determined without ΔH'
    ],
    answer: 0,
    hint: 'Use Kp = Kc(RT)^Δn; Δn = 1 for 2B − 1A.'
  },
  {
    type: 'Lab safety',
    topic: 'Acid-base Titrations',
    text: 'When rinsing a buret before filling with NaOH, you should…',
    options: [
      'Rinse with distilled water only',
      'Rinse with the NaOH solution to avoid dilution',
      'Dry completely with paper towels',
      'Rinse with strong acid to neutralize'
    ],
    answer: 1,
    hint: 'Condition the buret with the titrant.'
  },
  {
    type: 'Data interpretation',
    topic: 'Spectroscopy',
    text: 'A sharp IR absorption at ~3300 cm⁻¹ and a strong peak at 2100 cm⁻¹ most likely indicate…',
    options: [
      'Alcohol functional group',
      'Alkyne C≡C-H stretch',
      'Aldehyde C-H stretch',
      'Aromatic overtones'
    ],
    answer: 1,
    hint: 'Terminal alkynes give both ≡C-H (~3300) and C≡C (~2100).' 
  }
];

const trackGrid = document.getElementById('trackGrid');
const leaderboardGrid = document.getElementById('leaderboardGrid');
const questionBadge = document.getElementById('questionBadge');
const questionTopic = document.getElementById('questionTopic');
const questionText = document.getElementById('questionText');
const answers = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const xpCount = document.getElementById('xpCount');
const xpProgress = document.getElementById('xpProgress');
const submitButton = document.getElementById('submitButton');
const hintButton = document.getElementById('hintButton');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

tracks.forEach((track) => {
  const card = document.createElement('article');
  card.className = 'track-card';
  card.innerHTML = `
    <span class="badge">${track.badge}</span>
    <h3>${track.title}</h3>
    <p class="topic">${track.level}</p>
    <ul>
      ${track.focus.map((item) => `<li>• ${item}</li>`).join('')}
    </ul>
    <button class="ghost">Preview path</button>
  `;
  trackGrid.appendChild(card);
});

leaderboard.forEach((person, index) => {
  const card = document.createElement('article');
  card.className = 'leaderboard-card';
  card.innerHTML = `
    <p class="topic">Rank #${index + 1}</p>
    <strong>${person.name}</strong>
    <p>XP: ${person.xp}</p>
    <p>🔥 Streak: ${person.streak} days</p>
  `;
  leaderboardGrid.appendChild(card);
});

let state = {
  questionIndex: 0,
  xp: 0
};

function renderQuestion() {
  const current = questions[state.questionIndex];
  questionBadge.textContent = current.type;
  questionTopic.textContent = current.topic;
  questionText.textContent = current.text;
  answers.innerHTML = '';
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  current.options.forEach((option, idx) => {
    const id = `option-${state.questionIndex}-${idx}`;
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="answer" value="${idx}" id="${id}" />
      <span>${option}</span>
    `;
    answers.appendChild(label);
  });
}

function evaluateAnswer() {
  const choice = answers.querySelector('input[name="answer"]:checked');
  if (!choice) {
    feedbackEl.textContent = 'Select an option to continue.';
    feedbackEl.classList.add('error');
    return;
  }
  const selected = Number(choice.value);
  const current = questions[state.questionIndex];
  const correct = selected === current.answer;

  if (correct) {
    feedbackEl.textContent = 'Correct! +' + 30 + ' XP';
    feedbackEl.classList.add('success');
    state.xp += 30;
    state.questionIndex = (state.questionIndex + 1) % questions.length;
    updateXP();
    setTimeout(renderQuestion, 900);
  } else {
    feedbackEl.textContent = 'Not quite. Review the hint and try again!';
    feedbackEl.classList.add('error');
  }
}

function showHint() {
  const current = questions[state.questionIndex];
  feedbackEl.textContent = current.hint;
  feedbackEl.className = 'feedback';
  feedbackEl.classList.add('success');
}

function updateXP() {
  xpCount.textContent = state.xp;
  const percent = Math.min((state.xp % 300) / 3, 100);
  xpProgress.style.width = percent + '%';
}

submitButton.addEventListener('click', evaluateAnswer);
hintButton.addEventListener('click', showHint);

renderQuestion();
