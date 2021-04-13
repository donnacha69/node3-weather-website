const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const pathPublicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathPublicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Donnacha Dowling'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Donnacha Dowling'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help & Support',
        message: 'This is the help and support page for all your needs.',
        name: 'Donnacha Dowling'
    })
})

// the following will never run
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Donnacha'
//         },
//         {
//             name: 'Mickey'
//         }
//     ]
//    )
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
   
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error })
          }

          res.send({ Forecast: forecastData, location, Address: req.query.address })

        } )
    })

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Error: You must enter a value for Search!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        message: 'Help article not found.',
        name: 'Donnacha Dowling'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        message: 'Page not found.',
        name: 'Donnacha Dowling'
    })
})


app.listen(3000, () => {
    console.log('Server started on port 3000.')
})