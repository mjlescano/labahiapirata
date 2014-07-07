var dotenv = require('dotenv')
dotenv.load()

var onDevelopment = !!(process.env.NODE_ENV === 'development')
var onProduction = !!(process.env.NODE_ENV === 'production')

var path = require('path')
var express = require('express')

var app = express()

app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')
app.set('trust proxy', true)

if( onProduction ){
  app.use(require('compression'))
}

if( onDevelopment ){
  var assets = require(path.join(__dirname, 'lib', 'assets'))
  app.use(assets.css)
  app.use(express.static(path.join(__dirname, 'public')))
}

var controllers = require(path.join(__dirname, 'lib', 'controllers'))

app.get('/', controllers.home.index)
app.get('/search', controllers.search.index)

var server = app.listen(process.env.PORT)