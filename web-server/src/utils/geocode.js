const request = require('postman-request');

const geocode = (address, callback) => {
  const apiKey = `pk.eyJ1Ijoic3V5ZW9ubWUiLCJhIjoiY2tsZjV1eTh0MWhjYjJ4bzNxemNtcWdpaiJ9.SqfVfHblvk_fiwoGZ3y70w`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`;

  request({ url, json: true }, (error, response) => {
    const { features } = response.body;

    if (error) {
      callback('Unable to connect to location service.', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
