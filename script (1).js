// Get elements
const homeScreen     = document.getElementById('home-screen');
const terminalScreen = document.getElementById('terminal-screen');
const terminalOutput = document.getElementById('terminal-output');
const logo           = document.getElementById('logo');

const cursorSymbol = '_';
const slides = [
  "Welcome to our science presentation.\nTopic: The Cell\n\n>> Press any key to begin.",
  "What is a Cell?\n- A cell is the basic unit of life.\n- All living things are made of cells.\n\n>>",
  "Types of Cells:\n- Prokaryotic (no nucleus)\n- Eukaryotic (has nucleus)\n\n>>",
  "Cell Organelles:\n- Nucleus: control center\n- Mitochondria: energy maker\n- Ribosomes: protein builders\n- ER and Golgi: transport & process materials\n\n>>",
  "Fun Fact:\nYour body has around 37.2 trillion cells.\n\n>>",
  "Thank you!\nQuestions?\n\n>> Press any key to exit."
];

let currentSlide = 0;

// Utilities
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
function createCursor() {
  removeCursor();
  const c = document.createElement('span');
  c.textContent = cursorSymbol;
  c.classList.add('cursor');
  return c;
}
function removeCursor() {
  const ex = terminalOutput.querySelector('.cursor');
  if (ex) ex.remove();
}
async function typeText(txt, speed = 35) {
  removeCursor();
  terminalOutput.textContent = '';
  for (let ch of txt) {
    terminalOutput.textContent += ch;
    await sleep(speed);
  }
  terminalOutput.appendChild(createCursor());
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Slide logic
function handleSlideAdvance() {
  window.addEventListener('keydown', async function next() {
    currentSlide++;
    if (currentSlide < slides.length) {
      await typeText(slides[currentSlide]);
    } else {
      window.removeEventListener('keydown', next);
      await typeText(">> End of presentation.");
    }
  });
}

// Start presentation
async function startTerminal() {
  homeScreen.classList.add('hidden');
  terminalScreen.classList.remove('hidden');
  await typeText(slides[0]);
  handleSlideAdvance();
}

logo.addEventListener('click', startTerminal);
