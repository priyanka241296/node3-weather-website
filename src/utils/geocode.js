const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/ " +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicHJpeWFua2FrdWxrYXJuaTc1ODgiLCJhIjoiY2tqbDU0Mzd1MGlxYTJzbWpxcTBteTMweCJ9.8XFrN1-RIf1oFJ0u04wLNw&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// geocode("what 12", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

// geocode("California", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = geocode;
