const weatherForm = document.body.querySelector('form');
const searchInput = document.body.querySelector('input');
const messageOne = document.body.querySelector('#message-1');
const messageTwo = document.body.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  const location = searchInput.value;
  e.preventDefault();

  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';
  searchInput.value = '';

  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
    .catch(err => console.log(err));
});
