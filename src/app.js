const express = require('express')
const path = require('path') 
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Defining paths for Express configuration
const publicPath = path.join(__dirname , '../public')
const viewPath = path.join (__dirname , '../template/views')
const partialPath = path.join (__dirname , '../template/partials')


//Setting the value for template engine
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setting static directory
app.use(express.static(publicPath))


app.get('', (req,res) => {
    res.render('index',{title:'Weather', name:'Amra H'})
    })

app.get('/about', (req,res) => {
    res.render('about',{title:'About me', name:'Amra H'})

})

app.get('/help', (req,res) => {
    res.render('help',{message:'This is a help message',title:'Help',name:'Amra H'})

})

app.get('/weather', (req, res) => {
   
   if(!req.query.address)
   {  
    return res.send({error: 'Please provide address!'})
   }
   
   geocode(req.query.address, (error, {latitude, longitude, location} = {} //default value
          )=> {

    if(error){
        return res.send({
            error: 'You must provide a search term'    })
        }

    forecast(latitude, longitude, (error, forecastData) => {
      
      if(error)
      {
        return res.send({
            error: 'You must provide a search term'    })   
      }
  
      res.send({
          location:location,
          forecast:forecastData,
          address: req.query.address.toString()
      })

    })

    })

})

app.get('/products', (req,res) => {
    if(!req.query.search)
    {
         return res.send({
            error: 'You must provide a search term'
        })
    }
//    req.query //gets query from the browser
    res.send({
        products: []
    }
    )
})

app.get('/help/*', (req,res) => {
    
  //  res.send('The article does not exist!')
  res.render('404',{errorMessage:'Help article not found.'})
})

//404 page
app.get('*', (req,res) => {
    
  //  res.send('My 404 page')
  res.render('404',{errorMessage:'Page not found.'})
})

//starts the server
app.listen(3000, () => {
    //async process
    console.log('Server is up on port 3000!') 

})