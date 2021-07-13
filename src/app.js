const path = require('path');
const express = require('express');
const hbs = require('hbs');
const gecode = require('./utiles/geocode');
const weatherGecode = require('./utiles/forecast');
const { error } = require('console');
const app = express();
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryFile = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebar engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryFile))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        nam:'Arafat'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        nam:'Arafat'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must give a address!!!'
        })
    }

    gecode(req.query.address,(error,{location}={})=>{
        if(error){
            return res.send({error})
        }

        weatherGecode(req.query.address,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })



    //res.send({
       // forecast:'It is raining',
       // location:'Bangladesh',
        //address: req.query.address
   // })
})

/*app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search time'
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    });
})*/


app.get('/help',(req,res)=>{
    res.render('help',{
        text:'This is some helpful text.',
        title:'Help',
        nam:'Arafat'
    })
})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'404',
        nam:'Arafat',
        errorMessage:'Help articale are not found'
    })
})





app.get('*',(req,res)=>{
    res.render('404',{
     
        title:'404',
        nam:'Arafat',
        errorMessage:'Page not found!!!'
    })
})





app.listen(port,() =>{
    console.log('Server is up on port 3000.'+port);
})