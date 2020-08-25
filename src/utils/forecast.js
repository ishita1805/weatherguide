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
        'x-rapidapi-key': '235267e564msh20e0134e96b129ap1e8216jsn73536d74a64e',
        useQueryString: true
      }
    };

    request(options, function (error, response, body) {
      if (error) callback('error occured')
      callback(undefined,body)
    });
}

module.exports=forecast
