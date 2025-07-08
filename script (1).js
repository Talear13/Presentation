// Grab elements
const homeScreen     = document.getElementById('home-screen');
const terminalScreen = document.getElementById('terminal-screen');
const terminalOutput = document.getElementById('terminal-output');
const logo           = document.getElementById('logo');

const cursorSymbol = '_';

// Simple slide content for science presentation
const slides = [
  "Welcome to our science presentation.\n>> Press any key to continue.",
  "Topic: The Cell\nThe cell is the basic structural and functional unit of life.",
  "Two Types of Cells:\n- Prokaryotic\n- Eukaryotic",
  "Cell Organelles:\n- Nucleus\n- Mitochondria\n- Ribosomes\n- ER\n- Golgi Apparatus",
  "Thank you for watching!\n>> Questions?"
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
async function typeText(txt, speed = 50) {
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
  window.addEventListener('keydown', async function next(e) {
    currentSlide++;
    if (currentSlide < slides.length) {
      await typeText(slides[currentSlide]);
    } else {
      window.removeEventListener('keydown', next);
    }
  });
}

// Terminal start
async function startTerminal() {
  homeScreen.classList.add('hidden');
  terminalScreen.classList.remove('hidden');
  await typeText(slides[0]);
  handleSlideAdvance();
}

// Init
logo.addEventListener('click', startTerminal);
