const socket = io();

// Elements
const form = document.querySelector('#message-form');
const input = form.querySelector('input');
const button = form.querySelector('button');
const locationButton = document.querySelector('#send-location');
const messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate =
  document.querySelector('#location-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on('message', msg => {
  const html = Mustache.render(messageTemplate, {
    username: msg.username,
    message: msg.text,
    createdAt: moment(msg.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', message => {
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });

  messages.insertAdjacentHTML('beforeend', html);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  button.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;

  socket.emit('sendMessage', message, error => {
    button.removeAttribute('disabled');
    input.value = '';
    input.focus();

    if (error) {
      return console.log(error);
    }
    console.log('The message is sent.');
  });
});

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by browser.');
  }

  locationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(position => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    socket.emit('sendLocation', coords, () => {
      console.log('Location shared.');
      locationButton.removeAttribute('disabled');
    });
  });
});

socket.emit('join', { username, room }, error => {
  if (error) {
    alert(error);
    location.href = './';
  }
});
