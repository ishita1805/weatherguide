document.getElementById("button").addEventListener("click", function(event){
    event.preventDefault();
    const loc = $('#target').val();
    if (loc == ''){
      document.getElementById("message").innerHTML= "Enter a valid location"
      document.getElementById("message1").innerHTML= ""
    }
    else{
      document.getElementById("message").innerHTML= "Loading..."
      fetch('/weather?loc='+ loc)
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        if(data.cod==200){
          document.getElementById("message").innerHTML= data.sys.country+", "+data.name;

          document.getElementById("message1").innerHTML= 
          "The Current Temperature is "+data.main.temp+" °C."+
          "It feels like "+data.main.feels_like+" °C."+
          "The Wind Speed is "+data.wind.speed+" Kmph. "+
          "Humidity is at "+data.main.humidity+" %."+
          " Pressure: "+data.main.pressure+" mbar. "+
          data.clouds.all+"% cloudy"+" with a visibility of "+data.visibility+" m."
        }
        else{
          document.getElementById("message").innerHTML= "Error: "+data.cod
          document.getElementById("message1").innerHTML=data.message
        }
       


      });
    }
   
  });
