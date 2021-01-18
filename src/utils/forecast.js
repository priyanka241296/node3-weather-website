const request = require("postman-request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = function (latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the location service", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " dregrees out. There is a " +
          body.current.feelslike +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;

//  "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=" +
//      latitude +
//      "," +
//      longitude +"&access_token=pk.eyJ1IjoicHJpeWFua2FrdWxrYXJuaTc1ODgiLCJhIjoiY2tqbDU0Mzd1MGlxYTJzbWpxcTBteTMweCJ9.8XFrN1-RIf1oFJ0u04wLNw";

//https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicHJpeWFua2FrdWxrYXJuaTc1ODgiLCJhIjoiY2tqbDU0Mzd1MGlxYTJzbWpxcTBteTMweCJ9.8XFrN1-RIf1oFJ0u04wLNw
