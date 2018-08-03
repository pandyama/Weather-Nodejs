const http = require("https");
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var main_controller = require('../controller/main');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


//router.get('/',main_controller.currentWeather);
router.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});
router.post('/',main_controller.currentWeather);
router.get('/forecast', main_controller.currentForecast);
router.post('/forecast',main_controller.currentForecast);

module.exports = router;
