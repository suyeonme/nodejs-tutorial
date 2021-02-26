const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Setup paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Render handlebars template(views)
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Suyeon',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Suyeon',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help section',
    name: 'Suyeon',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
