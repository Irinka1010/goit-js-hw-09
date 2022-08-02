import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  buttonForm: document.querySelector('button'),
};
refs.buttonForm.addEventListener('click', onFormSubmit);

// Соберает значение формы  и запускает функцию промис
function onFormSubmit(ev) {
  ev.preventDefault();
  const amount = Number(refs.inputAmount.value);
  const firstDelay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let delay = firstDelay + i * step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
// Создает промис
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
