const request = require('request')

const geocode =(address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaXNoaXRha2FicmEiLCJhIjoiY2s0NGtmeWpsMGZxZTNsbzZwamllZTR0ZCJ9.u58dn25ppPCKMisfHn6LBA&limit=1'
    request({url, json: true }, (error , response ,body)=>{
      if(error){
        callback('unable to connect to the internet')
      }else if(response.body.features.length===0){
        callback('unable to find the location')
      }else{
        
        callback(undefined,{
          latitude:body.features[0].center[1],
          longitude:body.features[0].center[0],
          location:body.features[0].place_name,
          
        })
      } 
  })
  }
  
  module.exports=geocode
