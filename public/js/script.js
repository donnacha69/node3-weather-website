console.log('This is the client side JavaScript which will run in the browser.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_one')
const messageTwo = document.querySelector('#message_two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading results......"
    messageTwo.textContent = ""

    fetch('/weather?address=' + location).then((response)=> {
        response.json().then((data) => {
            
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                // console.log(data.location)
                // console.log(data.Forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
            }
        })
    })

})