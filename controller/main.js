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


 //<!--<% for(var i = 0; i < 8; i++){ var k = hour[i]%>-->
 	 //<!--<th scope="row" class="text-center"><h3><%= k%></h3></th>-->
//<!--<% } %>-->

var options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};


function GetDays(startDay, daysToAdd){
	var days = [];

	for(var i = 0; i < daysToAdd; i++){
		var currentDate = new Date();
		currentDate.setDate(startDay.getDate()+i);
		days.push(DayAsString(currentDate.getDay()));
	}
	return days;
}

function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
}

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
	  	let weatherText = `It's ${weather.main.temp} F in ${city}!`;
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

	var start = new Date();
	var days = GetDays(start, 5);
	console.log(days[0]);

	var hours = new Array("Midnight","3AM","6AM","9AM","Noon","3PM","6PM","9PM");

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
	  	//let size = Object.keys(test).length;
	  	//console.log(test.main.temp);
	  	//console.log(size);
	  	console.log(test);
	  	var i;
	  	var j = 0;
	  	var k = 0;
	  	var avgDay = 0;
	  	var send = [];

	  	var winds = [];
	  	var windDay = 0;


	  	for(i = 0; i < fore.list.length; i++){
	  		//a[i] = fore.list[i];

	  		winds[i] = fore.list[i];

	  		if(j != 7){
	  			avgDay = avgDay + (fore.list[i].main.temp);
	  			windDay = windDay + (fore.list[i].wind.speed);
	  			j++;
	  		}
	  		if(j == 7){
	  			send[k] = Math.round((avgDay/8));
	  			winds[k] = Math.round((windDay/8));
	  			//a[k] = ans;
	  			//console.log(ans);
	  			console.log(send[k]);
	  			j = 0;
	  			avgDay = 0;
	  			//ans = 0;
	  			k++;
	  		}
	  	};
	  	//var res = a[0];
	  	//console.log(res.main.temp);
	  	console.log(`${city}`);
	  	//let weather = JSON.parse(data);
	  	//let weatherText = `It's ${weather.main.temp} degrees in ${city}!`;
	  	let cityname = `Few days lookout for ${city}`;
		callback.render('forecast',{forecast: send, mycity: cityname, day: days, other: winds});
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        //callback.render('index', {weather: null, error: 'Error, please try again'});
        //callback(err);
    }).end();
	
}

