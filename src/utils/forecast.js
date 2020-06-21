const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c04045ecd6be09f592240c6e672145d2&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Forcast service unavailable', undefined);
        } else if (body.error || body.location.name === null) {
            callback('Something wrong with the location provided', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike, precip} = body.current;
            if(weather_descriptions.length === 0){
                callback(undefined, 'Sorry. Weather data currently unavailable.')
            } else {
                callback(undefined, `It's currently ${weather_descriptions[0].toLowerCase()} and ${temperature} degrees. It feels like ${feelslike} degrees. There's a ${precip}% chance of rain.`);
            }
        }
    })
};

module.exports = forecast;