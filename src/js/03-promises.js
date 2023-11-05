import Notiflix from 'notiflix';

import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.js';

let firstDelay = document.querySelector("[name='delay']");
let step = document.querySelector("[name='step']");
let amount = document.querySelector("[name='amount']");
let form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  for (let i = 0; i < amount.value; i++) {
    let timeCounter = Number(firstDelay.value) + i * Number(step.value);
    setTimeout(() => {
      createPromise(i, timeCounter);
    }, timeCounter);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });

  return promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `Fullfilled promise ${position + 1} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position + 1} in ${delay}ms`);
    });
}
