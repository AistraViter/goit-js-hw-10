import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const setTimerBtn = document.querySelector('.set-timer-btn');
setTimerBtn.disabled = true;

let dataDays = document.querySelector('[data-days]');
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');

let userSelectedDate; // Змінна для збереження вибраної дати
let endTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; // Зберегти вибрану дату в змінну
    let startTime = Date.now(); // Отримати поточну дату в форматі числа
    endTime = userSelectedDate.getTime();
    if (endTime - startTime < 0) {
      iziToast.show({
        iconUrl: "./img/cross.svg",
        iconColor: 'grey',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '18',
        backgroundColor: 'red',
        position:"topRight",
        class: 'custom-toast' ,
        icon: 'iziToast-icon'
      });

      setTimerBtn.disabled = true;
    } else {
      setTimerBtn.disabled = false;
    }
    setTimerBtn.addEventListener('click', () => {
      setTimerBtn.disabled = true;
      datetimePicker.disabled = true;
      const intervalId = setInterval(() => {
        let currentTime = Date.now();
        let ms = endTime - currentTime;

        if (ms <= 0) {
          clearInterval(intervalId);
          ms = 0;
          setTimerBtn.disabled = false;
          datetimePicker.disabled = false;
        }

        const remainingTime = convertMs(ms); // Отримати залишковий час
        fillRemaingTime(remainingTime); // Заповнити залишковий час
      }, 1000);
    });
  },
};

flatpickr(datetimePicker, options);

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

function fillRemaingTime({ days, hours, minutes, seconds }) {
  dataDays.textContent = days.toString().padStart(2, '0');
  dataHours.textContent = hours.toString().padStart(2, '0');
  dataMinutes.textContent = minutes.toString().padStart(2, '0');
  dataSeconds.textContent = seconds.toString().padStart(2, '0');
}
