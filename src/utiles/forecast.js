const request = require('request');

const weatherGecode = (address,callback) =>{

    const url = 'http://api.weatherstack.com/forecast?access_key=4e3884e4df02cbc2ee005e0d85c2a883&query='+address+'';
    
    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,' It is currently ' + body.current.temperature + ' degress out. There is a '+ body.current.precip+'% chance of rain.')
        }
    })
}

module.exports = weatherGecode;


