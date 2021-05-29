const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=b247e27725e176a5fc8de4b61b07865d&query=' +
    latitude +
    ', ' +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location!', undefined);
    } else {
      const current = response.body.current;
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The humidity is ${current.humidity} percent`
      );
    }
  });
};

module.exports = forecast;
