import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickrInstance = flatpickr('#datetime-picker', options);
startButton.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function startCountdown(targetDate) {
  const interval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(interval);
      Notiflix.Notify.success('Countdown finished.');
      return;
    }

    const remainingTime = convertMs(timeDifference);
    updateTimer(remainingTime);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);
  startCountdown(selectedDate);
});

// let countdownInterval;

// startButton.addEventListener('click', () => {
//   const selectedDate = new Date(datetimePicker.value).getTime();
//   startButton.disabled = true;

//   function updateCountdown() {
//     const currentDate = new Date().getTime();
//     const difference = selectedDate - currentDate;

//     if (difference <= 0) {
//       clearInterval(countdownInterval);
//       return;
//     }

//     const { days, hours, minutes, seconds } = convertMs(difference);

//     daysElement.textContent = addLeadingZero(days);
//     hoursElement.textContent = addLeadingZero(hours);
//     minutesElement.textContent = addLeadingZero(minutes);
//     secondsElement.textContent = addLeadingZero(seconds);
//   }

//   updateCountdown();
//   countdownInterval = setInterval(updateCountdown, 1000);
// });
