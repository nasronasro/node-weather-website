const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//difine path for express consfig
const app = express()
const pubDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve.
app.use(express.static(pubDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather application',
        name:'Belarbi nasreddine'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name : 'Belarbi nasreddine'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name : 'Belarbi nasreddine'
    })
})

//the actual work
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({error : 'must provide address term'})
    }

    geocode(req.query.address , (error, {lat,long,location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(lat,long,(error,data) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })

})
    
app.get('/help/*',(req,res) =>{
    res.render('404error',{
        errorMessage: 'Article not found.'
    })
})

app.get('*',(req,res) =>{
    res.render('404error',{
        errorMessage: 'page not found.'
    })
})

app.listen(3000,() =>{
    console.log('fucking working')
})