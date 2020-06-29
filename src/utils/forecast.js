const request = require('request');

const forecast =(latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=68b7cc82a4ebb20289a7dbf79272283e&query='+ latitude +','+ longitude+'&units=f';
    // query 37.8267,-122.4233
    request({url,json:true},(error,{body})=>{
        // const { error:responseErr } = body;
        if(error){
            callback('Unable to connect to the internet', undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            const { temperature, feelslike, weather_descriptions } = body.current;
            const message = `${weather_descriptions[0]} It is currently ${temperature} fernite out. It is feels like ${feelslike} out`
            callback(undefined, message);
        }
    });
    
}

module.exports = forecast;