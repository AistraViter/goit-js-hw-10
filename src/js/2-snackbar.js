import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.promise-form');
const delayField = document.querySelector('#delay-field');

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  let selectedRadio = document.querySelector('input[name="state"]:checked');

  if (delayField.value.trim() !== '' && selectedRadio) {
    const delay = parseInt(delayField.value, 10);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedRadio.value === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
    promise
      .then(result => {
        iziToast.show({
            class: 'promise-message',
            iconUrl: "/circle-down.svg",
            iconColor: 'grey',
            message: `Fulfilled promise in ${result} ms`,
            messageColor: 'white',
            messageSize: '18',
            backgroundColor: 'green',
            position: 'topRight',
            class: 'custom-toast',
            icon: 'iziToast-icon',
          });
  
      })
      .catch(error => {
        iziToast.show({
            class: 'promise-message',
          iconUrl: "/cancel-circle.svg",
          iconColor: 'grey',
          message: `Rejected promise in ${error} ms`,
          messageColor: 'white',
          messageSize: '18',
          backgroundColor: 'red',
          position: 'topRight',
          class: 'custom-toast',
          icon: 'iziToast-icon',
        });
      });
      promiseForm.reset();
  }
});
