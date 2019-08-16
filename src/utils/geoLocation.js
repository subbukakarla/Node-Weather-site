request = require('request')

const geoCode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoia2FrYXJsYTEiLCJhIjoiY2p6NnVkcWx3MGRjajNocGF5azF3ZmVmYiJ9.wl0lH8TGGtT5CAchXv4DQA&limit=1"

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Geotagging app',undefined)
        }else if(body.features.length === 0){
            callback("Could not find the location",undefined)
        }else{
            //console.log(response.body.features[0])
            const features = body.features[0]
            callback(undefined,{
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            })
        }
    })
}

module.exports = geoCode

// geoCode('Domlur,Bangalore,Karnataka',(err,data)=>{
//     console.log(err)
//     console.log(data)
// })



// const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/chakrampeta%20cuddapah.json?access_token=pk.eyJ1Ijoia2FrYXJsYTEiLCJhIjoiY2p6NnVkcWx3MGRjajNocGF5azF3ZmVmYiJ9.wl0lH8TGGtT5CAchXv4DQA&limit=1"

// request({url:geoURL,json:true},(err,res)=>{
//     //console.log(res.body)
//     if(err){
//         console.log("Unable to connect to geotagging app...")
//     } else if(res.body.features.length === 0 ){
//         console.log("Could not find the location: ",res.body.query.join(" "))
//     }else{
//         const longNLat = res.body.features[0].center
//         console.log(longNLat)
//     }
//     console.log(res.body)
// })