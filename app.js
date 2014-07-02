var config = require('./config/config')

var express = require('express')
var path = require('path')
var favicon = require('static-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')

app.use(favicon())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

var controllers = require(path.join(__dirname, 'lib', 'controllers'))

app.get('/', controllers.home.index)

var server = app.listen(config.port)