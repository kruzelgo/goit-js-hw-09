import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(form.elements['delay'].value);
  const delayStep = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * delayStep;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

// import Notiflix from 'notiflix';

// function createPromise(delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// const form = document.querySelector('.form');

// form.addEventListener('submit', function (event) {
//   event.preventDefault();

//   const firstDelay = parseInt(form.elements['delay'].value);
//   const delayStep = parseInt(form.elements['step'].value);
//   const amount = parseInt(form.elements['amount'].value);

//   for (let i = 0; i < amount; i++) {
//     const currentDelay = firstDelay + i * delayStep;

//     createPromise(i + 1, currentDelay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.Success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.Failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//   }
// });
