const request = require('request')
const fs = require('fs')
const path = require('path')


const reverseGeo = (lat,long,callback)=>{
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=381b3d08d847404eb4a5da25a2aac147`

    request({url,json:true},(error,response)=>{
        if (error) {
            callback(error)
        }else{
            callback(undefined,response.body.results[0].formatted)
        }
    })
    
}

module.exports= reverseGeo