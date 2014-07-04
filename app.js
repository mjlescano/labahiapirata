var dotenv = require('dotenv')
dotenv.load()

var express = require('express')
var path = require('path')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')
app.set('trust proxy', true)

app.use(require('stylus').middleware(path.join(__dirname, 'public')))

if( process.env.NOVE_ENV === 'development' ) {
  app.use(express.static(path.join(__dirname, 'public')))
}

var controllers = require(path.join(__dirname, 'lib', 'controllers'))

app.get('/', controllers.home.index)
app.get('/search', controllers.search.index)

var server = app.listen(process.env.PORT)