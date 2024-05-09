const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// telling my app to use ejs as the default template engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// code to serve the static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { data: '' });
});

app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : 'hyderabad';
  const appId = '5c4e0d3ce84ac12ffa3f51eb8eda9ab9';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + appId + '&units=metric';
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        res.render('index', { data: weatherData });
      });
    } else {
      res.render('index', { data: '0' });
    }
  });
});

app.listen(port, () => {
  console.log(`weatherly app runing on http://localhost:${port}`);
});
