const req = require('request')
const geocode = (address,callback) =>{
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2F0c3U0OSIsImEiOiJja2M0dzVjdDkwYndtMzBvMGpqYXFpN2xsIn0.KqTq8_lrshKLBqWV1sBEyQ`
    
    req({url:geoUrl,json:true},(error,response) =>{
        if(error){
            callback('Unnable to connect to geo service!')
        }else if(response.body.features.length === 0){
            callback('Unnable to find location!')
        }else{
            callback(undefined , {
                lat : response.body.features[0].center[1],
                long : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}
    module.exports = geocode