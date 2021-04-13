const request = require('postman-request')

const geocode = function (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG93bGluZ2Rvbm5hY2hhIiwiYSI6ImNra2VwODU2bTBlZnYydmp6cTRxaHVkNmsifQ.NZlFM16Rmge1R4tN2J5Rwg&limit=1'

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to locate the location specified.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode