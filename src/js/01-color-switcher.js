const startBt = document.querySelector('button[data-start]');
const stopBt = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;
stopBt.disabled = true;

startBt.addEventListener('click', onStartBackgroundColors);
stopBt.addEventListener('click', onStopSwitchColors);

function onStartBackgroundColors() {
  startBt.disabled = true;
  stopBt.disabled = false;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopSwitchColors() {
  clearInterval(intervalId);
  startBt.disabled = false;
  stopBt.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
