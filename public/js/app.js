console.log('Client side java script file!!')
//async fuction that's why we use then
/*
fetch('http://puzzle.mead.io/puzzle').then( 
    (response) => {
        response.json().then( (data) => {
            console.log(data)
        })
    }
)


fetch('http://localhost:3000/weather?address=Boston').then(
    (response) => {
        
        response.json().then((data) => {
            if(data.error) return console.log(data.error)
            console.log(data.location)
            console.log(data.forecast)
        })

    }
)
*/

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //fetching the http element using attribute
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = ''

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = searchLocation.value
    //console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then(
    (response) => {
        
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
               console.log(data.error)
            } 
            
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        })

    }
)
})