const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation = require('./utils/geoLocation')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
//Define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)   // Otherwise system will check for hbs in views directory by default
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirPath))
/*
//below also redirects for /
app.get('',(req,res)=>{
    res.send('<h1>Welcome Express!!</h1>')
})

app.get('/help',(req,res)=>{
    //res.send('Help Page')
    res.send({
        name : 'Subbu',
        place: 'Bangalore'
    })
})

app.get('/about',(req,res)=>{
    res.send('<h1> About the website<h1/>')
})
*/
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'D Trump Jr'
    })
})

app.get('/about',(req,res)=>{
        res.render('about',{
            title:'About me',
            name : 'D Trump Jr'
        })
    })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

        console.log('Address entered is: '+req.query.address)
        geoLocation(req.query.address,(error,{latitude,longitude,location}={})=>{
            console.log('error:',error)
            console.log(latitude,longitude,location)
            if(error){
               return res.send({
                error: error
            } )
            }
            forecast(latitude,longitude,(error,forecastmsg)=>{
                console.log('error:',error)
                if(error){
                    return res.send({
                     error: error
                 } )
                 }
                 console.log(forecastmsg)
                 res.send({
                     address_searched:req.query.address,
                     location,
                     forecast: forecastmsg[0],
                     temperatures: forecastmsg[1]
                 }) 
            })
        })
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return   res.send({
            error: 'You must provide a search'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        helptext: 'This is help page for using the website.'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : 'Help',
        code: '404:',
        message : 'Help Topic not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        code: '404:',
        message : 'Page not found'
    })
})

app.listen(port,()=>{
    console.log("Up and running on port "+port)
}) 
