import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  buttonForm: document.querySelector('button'),
};
refs.buttonForm.addEventListener('click', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();
  const amount = Number(refs.inputAmount.value);
  const firstDelay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  let delay = firstDelay;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

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
