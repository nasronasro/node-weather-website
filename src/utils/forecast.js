const req = require('request')

const forecast = (lat,long,callback) =>{
    const url = `http://api.weatherapi.com/v1/current.json?key=ee80d91911c14599b9d173346200207&q=${lat},${long}`

    req({url:url , json:true}, (error,response) =>{   
        if(error){
            callback('Unable to connect to weather service!')
        }else if(response.body.error){
            callback('Unable to find location!')
        }else{
            callback(undefined, `currently it's ${response.body.current.temp_c} degree celsius. The condiction out is ${response.body.current.condition.text} and the humidity degree is : ${response.body.current.humidity }`)
        }
    })
}
module.exports = forecast