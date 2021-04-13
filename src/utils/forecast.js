const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=bc2449c1c71b1ea0e451ba108e308936&query=' + longitude + ',' + latitude
    
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the Weather Service', undefined)
        } else if (body.error) {
            callback('Error! Please specify a valid location identifier using the query parameter.', undefined)
        } else {
            const namepart = body.location.name
            const region = body.location.region
            const country = body.location.country
            
            callback(undefined, namepart + ', ' + region + ', ' + country + ': ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees Celsius. It feels like ' + body.current.feelslike + ' degrees Celsius.')
            // callback(undefined, response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.location.country + ': ' + response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees Celsius. It feels like ' + response.body.current.feelslike + ' degrees Celsius.')
        } 
        
    })
}

module.exports = forecast
