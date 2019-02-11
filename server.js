/*Configure server stuff*/
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//GET PORT
const port = process.env.PORT || 3000;

//instatiate express
var app = express();

//set hbs settings
hbs.registerPartials(__dirname + '/views/partials');

//set templating engine
app.set('view engine', 'hbs');

//custom middleware
app.use((req,res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to write to server.log');
        }
    });

    next();
});

/*app.use((req, res, next)=>{
    res.render('maintenance.hbs', {
        pageTitle: '404 Page',
    });
});*/

//set this for all public accessible assets (Middleware register)
app.use(express.static(__dirname + '/public'));

//set helpers
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

//setup routes
app.get('/', (req, res)=>{

    //send data back
    //res.send('<h1>Hello Express !</h1>');
    /*res.send({
        name:"Kevin",
        likes: [
            'Movies',
            'Football'
        ]
    })*/
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage:'Welcome to NodeWebsites'
    });
});
app.get('/about', (req, res) =>{
    //res.send('About Waki');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage:'Bad Request!'
    });
});

//listen for traffic
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`);
});