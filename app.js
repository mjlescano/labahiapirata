var dotenv = require('dotenv')
dotenv.load()

var onDevelopment = process.env.NODE_ENV === 'development'
var onProduction = process.env.NODE_ENV === 'production'

var path = require('path')
var express = require('express')

var app = express()

app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')
app.set('trust proxy', true)

if( onProduction ){
  var compression = require('compression')
  app.use(compression({
    filter: function(req, res){
      return /json|text|javascript|image\/svg\+xml|application\/x-font-ttf|application\/vnd\.ms-opentype|application\/vnd\.ms-fontobject/.test(res.getHeader('Content-Type'))
    }
  }))
}

if( onDevelopment ){
  var assets = require('./lib/assets')
  app.use(assets.stylToCss)
  app.use(assets.cssPleeease)
  app.use(express.static(path.join(__dirname, 'public')))

  require('./lib/render-defaults')(app, {
    pretty: true
  })
}

var controllers = require('./lib/controllers')

app.get('/', controllers.home.index)
app.get('/search', controllers.search.index)

var server = app.listen(process.env.PORT)