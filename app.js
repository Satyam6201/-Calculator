const screen = document.querySelector("#screen");
const btns = document.querySelectorAll(".btn");
let memory = 0;
let lastAnswer = '';
let angleMode = "DEG"; // or RAD

// Handle digit input
btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    screen.value += e.target.innerText;
  });
});

// Insert operator
function addOperator(op) {
  screen.value += op;
}

// Calculate final expression
function calculate() {
  try {
    let expr = screen.value;
    // Replace custom symbols if needed
    let result = eval(expr);
    updateHistory(expr, result);
    screen.value = result;
    lastAnswer = result;
  } catch {
    screen.value = "Error";
  }
}

// History display
function updateHistory(expr, result) {
  const history = document.getElementById("history");
  const entry = document.createElement("div");
  entry.textContent = `${expr} = ${result}`;
  history.appendChild(entry);
}

// Clear entire history
function clearHistory() {
  document.getElementById("history").innerHTML = "";
}

// Use last answer
function useAns() {
  screen.value += lastAnswer;
}

// Insert parentheses
function insertParenthesis(p) {
  screen.value += p;
}

// Delete last digit
function backSpace() {
  screen.value = screen.value.slice(0, -1);
}

// Convert to radians if needed
function toAngle(value) {
  return angleMode === "DEG" ? parseFloat(value) * Math.PI / 180 : parseFloat(value);
}

// Toggle between DEG/RAD
function toggleAngleUnit() {
  angleMode = angleMode === "DEG" ? "RAD" : "DEG";
  document.getElementById("angleMode").textContent = angleMode;
}

// Math functions
function sin() {
  screen.value = Math.sin(toAngle(screen.value)).toFixed(5);
}
function cos() {
  screen.value = Math.cos(toAngle(screen.value)).toFixed(5);
}
function tan() {
  screen.value = Math.tan(toAngle(screen.value)).toFixed(5);
}
function sqrt() {
  screen.value = Math.sqrt(parseFloat(screen.value));
}
function log() {
  screen.value = Math.log10(parseFloat(screen.value));
}
function ln() {
  screen.value = Math.log(parseFloat(screen.value));
}
function pi() {
  screen.value += Math.PI.toFixed(5);
}
function e() {
  screen.value += Math.E.toFixed(5);
}
function power() {
  screen.value = Math.pow(parseFloat(screen.value), 2);
}
function cube() {
  screen.value = Math.pow(parseFloat(screen.value), 3);
}
function abs() {
  screen.value = Math.abs(parseFloat(screen.value));
}
function percentage() {
  screen.value = parseFloat(screen.value) / 100;
}
function powerY() {
  const base = parseFloat(prompt("Enter base:"));
  const exponent = parseFloat(prompt("Enter exponent:"));
  if (!isNaN(base) && !isNaN(exponent)) {
    screen.value = Math.pow(base, exponent);
  } else {
    screen.value = "Error";
  }
}
function fact() {
  let n = parseInt(screen.value);
  if (n < 0 || isNaN(n)) {
    screen.value = "Error";
    return;
  }
  let f = 1;
  for (let i = 1; i <= n; i++) f *= i;
  screen.value = f;
}

// Memory functions
function memoryAdd() {
  memory += parseFloat(screen.value || "0");
}
function memorySubtract() {
  memory -= parseFloat(screen.value || "0");
}
function memoryRecall() {
  screen.value += memory;
}
function memoryClear() {
  memory = 0;
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? "🌞" : "🌙";
}

// Voice input
function voiceInput() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript.toLowerCase();
    transcript = transcript.replace(/plus/g, "+")
                           .replace(/minus/g, "-")
                           .replace(/times|into|multiply/g, "*")
                           .replace(/divide|divided by/g, "/")
                           .replace(/pi/g, Math.PI.toFixed(5))
                           .replace(/e/g, Math.E.toFixed(5))
                           .replace(/power/g, "**");

    screen.value = transcript;
  };
}
