/* - - [ IMPORTING MODULES ] - - */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

/* - - [ SERVER CODE / APP CODE ] - - */
const port = process.env.PORT || 3000;
let app = express(); //initializing express server

hbs.registerPartials(__dirname + '/views/partials/'); //registering template partials
app.set('view engine', 'hbs'); //setting up our templating engine

//creating a server log system for users 
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

//creating a maintenance page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //setting up public route

hbs.registerHelper('getCurrentYear', () => { //registering a reusable function
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => { //registering a reusable function
    return text.toUpperCase();
});

/* - - [ SERVER CODE / PAGES ] - - */
//root/home route
app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        greeting: 'Hello Gerardo!'
    });

});

//about route
app.get('/about', (req, res) => {
    
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });

});

//404/bad route
app.get('/bad', (req, res) => {
    
    res.send({
        errorMessage: 'Unable to handle request'
    });

});

//portfolio page
app.get('/projects', (req, res) => {

    res.render('portfolio.hbs', {
        pageTitle: 'Portfolio Page'
    });

});

//server up on port 3000
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

//this command keeps an eye on the js & hbs files
//nodemon server.js -e js,hbs