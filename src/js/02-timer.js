import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.js';

const body = document.querySelector('body');
const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const timer = {
    div: document.querySelector('.timer'),
    field: document.querySelectorAll('.field'),
    value: document.querySelectorAll('.value'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
start.addEventListener('click', handleCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      let diff = selectedDates[0] - new Date();
      if (diff < 0) {
          return window.alert('Please choose a date in the future');
      } else { return start.disabled = false}
  },
};
flatpickr(input, options);
    
function handleCountdown() {
    const counter = setInterval(() => {
        let diff = new Date(input.value) - new Date();
        if (diff <= 0) { clearInterval(counter) }
        else {
            const date = new Date();
            let ms = new Date(input.value) - date;
            const { days, hours, minutes, seconds} = convertMs(ms);
            timer.days.textContent = addLeadingZero(days);
            timer.hours.textContent = addLeadingZero(hours);
            timer.minutes.textContent = addLeadingZero(minutes);
            timer.seconds.textContent = addLeadingZero(seconds);
        }
    }, 1000);
};

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

  return { days, hours, minutes, seconds} ;
};

function addLeadingZero(value) { 
    return value.toString().padStart(2,'0');
};