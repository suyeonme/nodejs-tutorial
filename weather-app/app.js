const request = require('postman-request');

const url =
  'http://api.weatherstack.com/current?access_key=8e1b2559cf3cb2e3fb46441af1274a8f&query=Seoul';

request({ url: url, json: true }, (error, response) => {
  console.log(
    `${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} out.`
  );
});

// Geocording
const geocodeUrl =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Seoul.json?access_token=pk.eyJ1Ijoic3V5ZW9ubWUiLCJhIjoiY2tsZjV1eTh0MWhjYjJ4bzNxemNtcWdpaiJ9.SqfVfHblvk_fiwoGZ3y70w';

request({ url: geocodeUrl, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];
  console.log(latitude, longitude);
});
