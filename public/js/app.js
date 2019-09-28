//console.log("client side javasript is loaded")

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch("http://localhost:3000/weather?address=?").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }  
//     })
// })

const search = document.querySelector('input')
//console.log(search)
const weatherForm= document.querySelector('form')
const message1 =document.getElementById('message1')
//message1.textContent ='from js'
const message2 = document.querySelector('#message2')  //another way like gerElement by id
const message3 = document.querySelector('#message3')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if (skipDefaultFormSubmission) {
        return 
    }
    message1.textContent = 'Loading details...'
    message2.textContent = ''
    message3.textContent = ''
    const location = search.value
    console.log(location)
    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            message1.textContent = data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            message1.textContent = data.location
            message2.textContent = data.forecast
            message3.textContent=data.temperatures
        
        }  
    })
})

})



//Additional Button for sending current loaction
const currentLocation = document.querySelector('#current-Location')
let skipDefaultFormSubmission = false 
currentLocation.addEventListener('click',()=>{
    message1.textContent = 'Allow your browser to access your location'
    message2.textContent = ''
    message3.textContent = ''

    skipDefaultFormSubmission=true
    if(!navigator.geolocation){
        return alert('Your Browser does not support geolocation feature')
    }

    const geooptions = {
        enableHighAccuracy: true, 
        // maximumAge        : 30000, 
        timeout           : 25000
      };
    
    navigator.geolocation.getCurrentPosition(position_cb,error_cb,geooptions);
    function position_cb(position){
        message1.textContent = 'Loading details...'
        message2.textContent = ''
        message3.textContent = ''
        // const location = {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude
        // } 
        // console.log(location)
        // console.log("/weather?coords="+location.coords.)
        const location = position.coords.latitude+","+position.coords.longitude
        fetch("/weather?coords="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
            }else{
                console.log(data.location)
                console.log(data.forecast)
                message1.textContent = data.location
                message2.textContent = data.forecast
                message3.textContent=data.temperatures
            
            }  
        })
    })
    
    }
        function error_cb(error){
            /**
             * PERMISSION_DENIED: 1
             * POSITION_UNAVAILABLE: 2
             * TIMEOUT: 3
             */

            if (error.code===1) {
                message1.textContent = 'You disalloed your browser to track your location'
                return alert('Location Permission Dissallowed')    
            } else if(error.code===2){
                message1.textContent = 'Your current location is not available'                
                return alert( 'Location is not available')    
            }else if(error.code===3){
                message1.textContent = `Timed out after ${geooptions.timeout/1000} Seconds`                
                return alert(`Timed out ${geooptions.timeout/1000} Seconds`)    
            }
        }
    
})
