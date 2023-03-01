const stopwatchStartBtn = document.querySelector(".stopwatch-start");
const stopwatchStopBtn = document.querySelector(".stopwatch-stop");
const stopwatchResetBtn = document.querySelector(".stopwatch-reset");
const stopwatchTime = document.querySelector(".stopwatch-time");

let stopwatchInterval;
let stopwatchStartTime;
let stopwatchElapsed = 0;

stopwatchStartBtn.addEventListener("click", () => {
  stopwatchStartTime = Date.now() - stopwatchElapsed;

  stopwatchInterval = setInterval(() => {
    stopwatchElapsed = Date.now() - stopwatchStartTime;
    updateStopwatchTime(stopwatchElapsed);
  }, 10);

  stopwatchStartBtn.disabled = true;
});

stopwatchStopBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchStartBtn.disabled = false;
});

stopwatchResetBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchElapsed = 0;
  updateStopwatchTime(stopwatchElapsed);
  stopwatchStartBtn.disabled = false;
});

function updateStopwatchTime(timeElapsed) {
  const minutes = Math.floor(timeElapsed / 60000);
  const seconds = Math.floor((timeElapsed - minutes * 60000) / 1000);
  const milliseconds = Math.floor(
    (timeElapsed - minutes * 60000 - seconds * 1000) / 10
  );

  stopwatchTime.textContent = `${padNumber(minutes)}:${padNumber(
    seconds
  )}:${padNumber(milliseconds)}`;
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

const timerStartBtn = document.querySelector(".timer-start");
const timerStopBtn = document.querySelector(".timer-stop");
const timerResetBtn = document.querySelector(".timer-reset");
const timerTime = document.querySelector(".timer-time");
const timerInputMinutes = document.querySelector("#timer-input-minutes");
const timerInputSeconds = document.querySelector("#timer-input-seconds");
const timerSetBtn = document.querySelector(".timer-set");

let timerInterval;
let timerTimeRemaining;
let timerEndTime;

timerStartBtn.addEventListener("click", () => {
  timerEndTime = Date.now() + (timerTimeRemaining || 0);

  timerInterval = setInterval(() => {
    if (timerTimeRemaining <= 0) {
      clearInterval(timerInterval);
      updateTimerTime(0);
      return;
    }
    timerTimeRemaining = timerEndTime - Date.now();
    updateTimerTime(timerTimeRemaining);
  }, 10);

  timerStartBtn.disabled = true;
});

timerStopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerStartBtn.disabled = false;
});

timerResetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerTimeRemaining = 0;
  updateTimerTime(timerTimeRemaining);
  timerStartBtn.disabled = false;
});

timerSetBtn.addEventListener("click", () => {
  const minutes = parseInt(timerInputMinutes.value);
  const seconds = parseInt(timerInputSeconds.value);
  timerStartBtn.disabled = false;
  if (
    isNaN(minutes) ||
    isNaN(seconds) ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    alert("Please enter valid minutes and seconds.");
    return;
  }

  timerTimeRemaining = minutes * 60000 + seconds * 1000;
  updateTimerTime(timerTimeRemaining);
});

function updateTimerTime(timeRemaining) {
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining - minutes * 60000) / 1000);

  timerTime.textContent = `${padNumber(minutes)}:${padNumber(seconds)}`;
}
