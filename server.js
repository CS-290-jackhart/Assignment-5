/*
 * Name: Jackson Hart
 * Email: hartjack@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')

var twitData = require('./twitData.json')

var app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).render('twitPage', {
    twits: twitData
  })
})

app.get('/twits/:num', (req, res, next) => {
  var num = Number(req.params.num)
  if (num >= 0 && num < twitData.length) {
    res.status(200).render('partials/twit', twitData[num])
  } else {
    next()
  }
})

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
