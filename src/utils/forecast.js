var request = require("request");

const forecast = (lat,long,loc,callback)=>{
    var options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      qs: {
        q: loc,
        lat:lat,
        long:long,
        units:"metric"
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'Your API key goes here',
        useQueryString: true
      }
    };

    request(options, function (error, response, body) {
      if (error) callback('error occured')
      callback(undefined,body)
    });
}

module.exports=forecast
