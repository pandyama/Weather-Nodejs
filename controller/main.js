var express = require('express');
var bodyParser = require('body-parser');
/*exports.test = function(req, res){
	res.send('Greetings from Test Controller');
};*/
const http = require("https");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiKey = '0a877c81070549dca8624124180606';



var options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};
let city = 'hello';
exports.currentWeather = function(query, callback){
	city = query.body.city;
	options.path = '/v1/current.json?key=' + apiKey + '&q=' + city;
	console.log("Hello");
	//let options = `https://api.apixu.com/v1/current.json?key=749320455e3f4cff97f200246181006&q=${city}`
	http.request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=168e2b48de1acb989df3eada5547778c`, function(res) {
	  let data = '';
	  
	  res.on('data', function (chunk) {
	  	//console.log("Hello");
	  	data += chunk;
	  	//console.log(JSON.parse(data));
	  	//console.log(JSON.stringify(data));
	  	
	  });
	  res.on('end', function (chunk) {
	  	let weather = JSON.parse(data);
	  	console.log(weather);
	  	let weatherText = `It's ${weather.main.temp} degrees F in ${city}!`;
		callback.render('index', {weather: weatherText, error: null});
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback.render('index', {weather: null, error: 'Error, please try again'});
        //callback(err);
    }).end();
}


exports.currentForecast = function(query, callback){
	//let city = query.body.city;
	http.request(`https://api.openweathermap.org/data/2.5/forecast?q=${city},ca&units=imperial&appid=168e2b48de1acb989df3eada5547778c`, function(res) {
		let data = "";

		res.on('data', function(chunk){
			console.log("hello");
			data += chunk;
	  		//console.log(JSON.parse(data));
		});
		res.on('end', function (chunk) {
	  	let fore = JSON.parse(data);
	  	console.log("Hello 1 2 3....");
	  	let test = fore.list;
	  	let size = Object.keys(test).length;
	  	//console.log(test.main.temp);
	  	console.log(size);
	  	var i;
	  	var a = [];
	  	for(i = 0; i < fore.list.length; i++){
	  		a[i] = fore.list[i];
	  	};
	  	var res = a[0];
	  	console.log(res.main.temp);
	  	console.log(`${city}`);
	  	//let weather = JSON.parse(data);
	  	//let weatherText = `It's ${weather.main.temp} degrees in ${city}!`;
	  	let cityname = `Forecast for ${city}`;
		callback.render('forecast',{forecast: a, mycity: cityname});
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        //callback.render('index', {weather: null, error: 'Error, please try again'});
        //callback(err);
    }).end();
	
}