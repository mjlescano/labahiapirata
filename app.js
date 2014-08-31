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
      console.log(res.getHeader('Content-Type'))
      return /javascript/.test(res.getHeader('Content-Type'))
    }
  }))
}


var assets = require('./lib/assets')
var renderDefaults = require('./lib/render-defaults')
var controllers = require('./lib/controllers')

//   // assets.stylToCss()
// if( onDevelopment ){
//   renderDefaults.add({ pretty: true })

//   app.use(renderDefaults)
//   app.use(assets.stylToCss)
//   app.use(assets.cssPleeease)
//   app.use(express.static(path.join(__dirname, 'public')))
// }


app.get('/', controllers.home.index)
app.get('/search', controllers.search.index)

var server = app.listen(process.env.PORT)