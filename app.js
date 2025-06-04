let screen = document.querySelector("#screen");
let btns = document.querySelectorAll(".btn");
let memory = 0;

// Add digit buttons
btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    screen.value += e.target.innerText;
  });
});

function addOperator(op) {
  screen.value += op;
}

function calculate() {
  try {
    let result = eval(screen.value);
    updateHistory(screen.value, result);
    screen.value = result;
  } catch {
    screen.value = "Error";
  }
}

// History System
function updateHistory(expr, result) {
  let history = document.getElementById("history");
  let entry = document.createElement("div");
  entry.textContent = `${expr} = ${result}`;
  history.appendChild(entry);
}

// Math Functions
function sin() { screen.value = Math.sin(toRadians(screen.value)).toFixed(5); }
function cos() { screen.value = Math.cos(toRadians(screen.value)).toFixed(5); }
function tan() { screen.value = Math.tan(toRadians(screen.value)).toFixed(5); }
function sqrt() { screen.value = Math.sqrt(parseFloat(screen.value)); }
function log() { screen.value = Math.log10(parseFloat(screen.value)); }
function ln() { screen.value = Math.log(parseFloat(screen.value)); }
function pi() { screen.value = Math.PI.toFixed(5); }
function e() { screen.value = Math.E.toFixed(5); }
function power() { screen.value = Math.pow(parseFloat(screen.value), 2); }
function cube() { screen.value = Math.pow(parseFloat(screen.value), 3); }
function abs() { screen.value = Math.abs(parseFloat(screen.value)); }
function percentage() { screen.value = parseFloat(screen.value) / 100; }
function powerY() {
  let base = parseFloat(prompt("Enter base:"));
  let exp = parseFloat(prompt("Enter exponent:"));
  screen.value = Math.pow(base, exp);
}
function fact() {
  let n = parseInt(screen.value);
  if (n < 0) return screen.value = "Error";
  let f = 1;
  for (let i = 1; i <= n; i++) f *= i;
  screen.value = f;
}
function backSpace() {
  screen.value = screen.value.slice(0, -1);
}
function toRadians(deg) {
  return parseFloat(deg) * Math.PI / 180;
}

// Memory
function memoryAdd() { memory += parseFloat(screen.value); }
function memorySubtract() { memory -= parseFloat(screen.value); }
function memoryRecall() { screen.value = memory; }
function memoryClear() { memory = 0; }

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? "🌞" : "🌙";
}

// Voice Input
function voiceInput() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = function (event) {
    screen.value = event.results[0][0].transcript.replace("x", "*");
  };
}
