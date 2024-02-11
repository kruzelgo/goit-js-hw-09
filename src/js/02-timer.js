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

let flatpickrInstance = flatpickr('#datetime-picker', options);
startButton.disabled = true;
let countdownInterval;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startCountdown(targetDate) {
  clearInterval(countdownInterval); // Clear any existing interval
  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown finished.');
      return;
    }

    const remainingTime = convertMs(timeDifference);
    updateTimer(remainingTime);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  startCountdown(selectedDate);
});
