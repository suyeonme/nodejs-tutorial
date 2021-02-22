const request = require('postman-request');

const forecast = (lat, lon, callback) => {
  const apiKey = `8e1b2559cf3cb2e3fb46441af1274a8f`;
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}`;

  request({ url, json: true }, (reject, response) => {
    const { error, current } = response.body;

    if (reject) {
      callback('Unable to connect to weather service.', undefined);
    } else if (error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${current.weather_descriptions}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} out.`
      );
    }
  });
};

module.exports = forecast;
