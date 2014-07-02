var config = require('./config/config')

var express = require('express')
var path = require('path')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')

app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

var controllers = require(path.join(__dirname, 'lib', 'controllers'))

app.get('/', controllers.home.index)
app.get('/search', controllers.search.index)

var server = app.listen(config.port)