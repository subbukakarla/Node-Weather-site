//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const request = require('request')

const forecast = (latitude,longitude,callback)=>{
  const url = 'https://api.darksky.net/forecast/13b8051d7c0ded8e47a81aac3be5a6b7/'+latitude+','+longitude+'/?units=si'
  //console.log(url)
  request({url,json:true},(error,{body})=>{  //shorthand notation as the attribute and variable name are same
        if(error){
          callback("Not able to connect weather api",undefined)
        }else if(body.error){
          callback("Unable to find the location",undefined)
        } else {
          //const respBody = response.body
          //console.log(respBody)
          //console.log("This week prediction: "+respBody.daily.summary)
          callback(undefined,body.daily.data[0].summary+" Current temperature is "+body.currently.temperature+"°C and "+
                      body.currently.precipProbability+"% chances of "+body.currently.precipType)
    }   
  })
}

module.exports = forecast

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })
 






//const request = require('request')

//const url = 'https://api.darksky.net/forecast/13b8051d7c0ded8e47a81aac3be5a6b7/37.8267,-122.4233/?units=si'

// request({uri:url,json:true},(err,res)=>{
//     if(err){
//         console.log("Not able to connect weather api")
//     }else if(res.body.error){
//         console.log("Unable to find the location..")
//     } else {
//         const respBody = res.body
//         //console.log(respBody)
//          console.log("This week prediction: "+respBody.daily.summary)
//         console.log(respBody.daily.data[0].summary+" Current temperature is "+respBody.currently.temperature+"°C and "+
//                 respBody.currently.precipProbability+"% chances of "+respBody.currently.precipType)
//     }   
// })
