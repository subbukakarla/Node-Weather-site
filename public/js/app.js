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


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent = 'Loading details...'
    message2.textContent = ''
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
        
        }  
    })
})

})
