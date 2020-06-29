const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');

const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // serve templates from template folder and serve views as template - because by default express serve views directory
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        } 
        
        forecast(latitude, longitude, (error, response)=>{
            if(error){
                return res.send({
                    error,
                })  
            }
            return res.send( {
                forecast: response,
                location,
                address: req.query.address
            });    
        })
        
        // return res.send( {
        //     forecase: 'It is summer',
        //     location: 'India',
        //     address: response
        // });
    });

    
});

app.get('/products', (req, res)=>{
    res.send('prod');
});

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Rohit'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Rohit'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        helpText: 'This is help page',
        name: 'Rohit'  
    });
});

app.get("/help/*", (req, res)=>{
    res.render('404', {
        title:'404',
        name: 'Rohit',
        errorMessage:'Help Article not found'
    });
});

app.get("*", (req, res)=>{
    res.render('404', {
        title:'404',
        name: 'Rohit',
        errorMessage:'Page not found'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});