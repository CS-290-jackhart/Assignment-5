/*
 * Name: Jackson Hart
 * Email: hartjack@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')

var twitData = require('./twitData.json')

var app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: null }))
app.set('view engine', 'handlebars')

var port = process.env.PORT || 3000;

app.get('/style.css', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'style.css'))
})

app.get('/index.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.js'))
})

app.get('/', (req, res) => {
  console.log(twitData)
  res.status(200).render('twitPage', {
    twits: twitData
  })
})

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
