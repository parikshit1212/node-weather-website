const request = require('request');

const geocode = (address, callback) => {
  const url =
    'http://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicGFyaWtzaGl0eWFkYXYxMiIsImEiOiJja2Nua3RzNHEwYzZiMzNsdWEwc2VkbGdmIn0.7ycQEZS-B_4W-16rRHNn3w&limit=1';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find this location. Try another!', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
