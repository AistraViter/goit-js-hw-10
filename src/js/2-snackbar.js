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
          resolve(`Fulfilled promise in ${delay} ms`);
        } else {
          reject(`Rejected promise in ${delay} ms`);
        }
      }, delay);
    });
    promise
      .then(result => {
        iziToast.show({
            class: 'promise-message',
            iconUrl: "/img/circle-down.svg",
            iconColor: 'grey',
            message: result,
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
          iconUrl: "/img/cancel-circle.svg",
          iconColor: 'grey',
          message: error,
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
