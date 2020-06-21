const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Public directory setup
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'WEATHER',
        name: 'Anand Upadhya'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Anand Upadhya',
        content: 'All your questions will be answered here.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT ME',
        name: 'Anand Upadhya'
    });
});

//WEATHER API
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({ error: 'The address query must be provided' })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            
            return res.send({
                title: 'WEATHER FORECAST',
                name: 'Toby Cai',
                address: req.query.address,
                location,
                latitude,
                longitude,
                forecast: forecastData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404: HELP NOT FOUND!',
        name: 'Anand Upadhya',
        content: 'Please give us a call so we can help you further.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: OOPS!',
        name: 'Anand Upadhya',
        content: 'Looks like we don\'t have the page you are looking for'
    });
});

app.listen(3000, () => {
    console.log('SERVER STARTED IS RUNNING ON PORT 3000');
});