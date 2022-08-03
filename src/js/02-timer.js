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

refs.startBt.disabled = true;

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};
function onClose(selectedDates) {
  selectedDate = selectedDates[0];
  if (selectedDate < options.defaultDate) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  refs.startBt.disabled = false;
}

flatpickr(refs.inputEL, options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const ms = selectedDate - currentTime;
      if (ms <= 0) {
        clearInterval(this.intervalId);
        refs.startBt.disabled = true;
        this.isActive = false;
        this.intervalId = null;

        return;
      }
      const time = convertMs(ms);
      updateClockface(time);
    }, 1000);
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
