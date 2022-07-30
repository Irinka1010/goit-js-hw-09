const startBt = document.querySelector('button[data-start]');
const stopBt = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBt.addEventListener('click', onStartBackgroundColors);
stopBt.addEventListener('click', onStopSwitchColors);
// Запускает изменения цвета фона
function onStartBackgroundColors() {
  startBt.setAttribute('disabled', true);
  stopBt.removeAttribute('disabled');

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
//Останавливает изменения цвета фона
function onStopSwitchColors() {
  clearInterval(intervalId);
  stopBt.setAttribute('disabled', true);
  startBt.removeAttribute('disabled');
}

// Генерирует случайний цвет
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
