let screen = document.querySelector("#screen");
let btn = document.querySelectorAll(".btn");

function addOperator(operator) {
    screen.value += operator;
}

for (let item of btn) {
    item.addEventListener("click", (e) => {
        let btntext = e.target.innerText;

        if (btntext === "×") btntext = "*";
        if (btntext === "÷") btntext = "/";
        if (btntext === "+") btntext = "+";
        if (btntext === "-") btntext = "-";
        if (btntext === "x²") btntext = "^2";
        if (btntext === "AC") screen.value = "";
        if (btntext === "=") screen.value = eval(screen.value);

        screen.value += btntext;
    });
}

// Trigonometric Functions
function sin() {
    screen.value = Math.sin(parseFloat(screen.value) * Math.PI / 180);  // degrees to radians
}

function cos() {
    screen.value = Math.cos(parseFloat(screen.value) * Math.PI / 180);  // degrees to radians
}

function tan() {
    screen.value = Math.tan(parseFloat(screen.value) * Math.PI / 180);  // degrees to radians
}

// Other Functions
function pi() {
    screen.value = Math.PI;
}

function e() {
    screen.value = Math.E;
}

function log() {
    screen.value = Math.log10(parseFloat(screen.value));
}

function sqrt() {
    screen.value = Math.sqrt(parseFloat(screen.value));
}

function power() {
    screen.value = Math.pow(parseFloat(screen.value), 2);
}

function fact() {
    let num = parseInt(screen.value);
    if (num < 0) {
        screen.value = "Error";
        return;
    }
    let f = 1;
    for (let i = 1; i <= num; i++) {
        f *= i;
    }
    screen.value = f;
}

function backSpace() {
    screen.value = screen.value.slice(0, -1);
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    let themeBtn = document.getElementById('themeToggle');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = "🌞";
    } else {
        themeBtn.textContent = "🌙";
    }
}
