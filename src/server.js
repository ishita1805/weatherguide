const express = require('express')  //express-js to set up server
const path = require('path')   //inbuilt node package
const bodyParser = require('body-parser')   //inbuilt node package
const app = express()  
const viewsDir = path.join(__dirname,'../views')  //setting up the templating engine
app.set('view engine', 'hbs') 
app.set('views', viewsDir)  
const port = process.env.PORT || 3000  //for dev deployment
const publicDir = path.join(__dirname,'../public')  //setting up the public folder 
app.use(express.static(publicDir))  //app.use middleware
app.use(bodyParser.json())      //ap.use middleware
const urlencodedParser = bodyParser.urlencoded({extended:false})  //for making post requests
const forecast = require('./utils/forecast.js') //importing functions
const geocode = require('./utils/geocode.js')

//get request to load the index page
app.get('/',(req,res)=>{
    const title = "Weather Guide"
    const name = "Ishita & Harshith"
    res.render('index',{title,name}) 
})

//post request to send user search
app.get('/weather',async(req,res)=>{
    var loc = req.query.loc
    geocode(loc, (error,data)=>{
        if (error){
        return res.send({
                error
            })
        }
        const {latitude, longitude, location} = data
        // 
        forecast(latitude,longitude,location,(error,data)=>{
            const err = "Invalid input";
            if(error){
                return res.send({
                    err
                })
            }
            res.send(data)
        })
    
     })
})

//get request to load the Help page
app.get('/help',(req,res)=>{
    const title = "Weather Guide"
    const name = "Ishita & Harshith"
    const msg = "This is a sample help page"
    res.render('help',{title,name,msg}) 
})

//get request for rendering error pages
app.get('/*',(req,res)=>{
    const title = "Error :("
    const name = "Ishita & Harshith"
    const msg = "Oops! The page you're trying to access doesnt exist. Try using the links given above."
    res.render('help',{title,name,msg}) 
})

app.listen(port,()=>{
    console.log('Weather App is live on localhost ' + port)
})
