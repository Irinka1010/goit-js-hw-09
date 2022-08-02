import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  inputEL: document.querySelector('#datetime-picker'),
  startBt: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.startBt.addEventListener('click', () => {
  timer.start();
});

//По умолчанию кнопка не активна
refs.startBt.setAttribute('disabled', true);

let selectedDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBt.removeAttribute('disabled');
  },
};
flatpickr(refs.inputEL, options);
// Метод старта
const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTima = Date.now();
      const ms = selectedDate - currentTima;
      if (ms <= 0) {
        clearInterval(this.intervalId);
        refs.startBt.setAttribute('disabled', true);
        return;
      }
      const time = convertMs(ms);
      updateClockface(time);
    }, 1000);
  },
};

// Отрисовует интерфейс
function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
// Принимает число, приводит к строчке и добавляет в начало 0 если число меньше 2-х
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// Принимает время в милисикундах и переводит его в правельный формат
function convertMs(ms) {
  // Количество миллисекунд в единицу времени
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Оставшиеся дни
  const days = addLeadingZero(Math.floor(ms / day));
  // Оставшиеся  часы
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Оставшиеся минуты
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Оставшиеся  секунди
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
