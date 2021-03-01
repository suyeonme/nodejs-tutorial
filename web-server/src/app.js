const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000; // Set Heroku port and localhost

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

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    error: 'No information found',
    name: 'Suyeon',
  });
});

// 404 page
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    error: 'Page not found',
    name: 'Suyeon',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
