const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFkemlhcmFwb3ZpYyIsImEiOiJjazlsdmR6d3EwYjVoM2RxMHMzNWFiNm1kIn0.-HmZM2lkbJGGMyQkjOzoeA&limit=1'

    request(
    {
        url,
        json:true
    },
    (error,response) => {
        const {body : info} = response

        if(error) {
            callback('Unable to connect to location services',undefined)
        }
        else if(info.features.length === 0 ){

            callback('Unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined, {
                latitude: info.features[0].center[0],
                longitude: info.features[0].center[1],
                location: info.features[0].place_name
            })
        }
    }
    )
}

module.exports = geocode