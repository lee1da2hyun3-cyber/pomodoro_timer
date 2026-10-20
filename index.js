function loadMinutes() {
  const n = Number(localStorage.getItem("pomodoroMinutes"));
  return Number.isInteger(n) && n >= 1 && n <= 60 ? n : 25;
}

const INITIAL_SECONDS = loadMinutes() * 60;

const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let remaining = INITIAL_SECONDS;
let intervalId = null;

function render() {
  const min = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec = String(remaining % 60).padStart(2, "0");
  timerEl.textContent = `${min}:${sec}`;
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

startBtn.onclick = function () {
  if (intervalId !== null || remaining === 0) return;
  intervalId = setInterval(function () {
    remaining--;
    render();
    if (remaining === 0) stopTimer();
  }, 1000);
};

stopBtn.onclick = function () {
  stopTimer();
};

resetBtn.onclick = function () {
  stopTimer();
  remaining = INITIAL_SECONDS;
  render();
};

render();
