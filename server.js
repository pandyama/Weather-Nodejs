var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var api = require('./routes/api');


var app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});*/

//app.get('/forecast', api.currentForecast);
  //res.render('forecast',{forecast: null, error: null});
//});
app.use('/', api);

//app.post('/',api.currentWeather);
//app.use('/',api);


//app.post('/forecast', api.currentForecast);
//app.use('/', api);

  /*let city = req.body.city;
  let url = `https://api.apixu.com/v1/current.json?key=0a877c81070549dca8624124180606&q=${city}`
*/
  /*http.request(url, function (err, response) {
    if(err){
      console.log(err);
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = (response)
      console.log(weather.current);
      if(weather.temp_c == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.current.temp_c} degrees in ${city}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });*/

app.listen(3100, function () {
  console.log('Example app listening on port 3000!')
});