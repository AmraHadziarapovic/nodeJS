const request = require('request')

const forecast = (latitude,longitude,callback) => {
    //37.8267,-122.4233
    //-73.9808, 40.7648
    const url = 'http://api.weatherstack.com/current?access_key=d6b55e26b1db026720fb3d36e4ee68cd&query='+latitude+',' + longitude + '&units=m'

    request( 
        {
            url,
            json:true
        },
        (error,response)=> {
            const {body : info} = response
            if(error) {
                console.log('Unable to connect to weather service!')
            }
            else if(info.error)
            {
                console.log('Unable to find location')
            }
            else{
                
                callback(undefined, {
                    description:info.current.weather_descriptions[0],
                    temperature:info.current.temperature,
                    feelslike:info.current.feelslike

                })
            }
        })
    } 

module.exports = forecast