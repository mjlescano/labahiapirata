var dotenv = require('dotenv')
dotenv.load()

var env = require('./lib/env')

var path = require('path')
var express = require('express')

var app = express()

app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')
app.set('trust proxy', true)

if (env.production) {
  var compression = require('compression')
  app.use(compression({
    filter: function(req, res){
      console.log(res.getHeader('Content-Type'))
      return /javascript/.test(res.getHeader('Content-Type'))
    }
  }))
}

if (env.development) {
  var assets = require('./lib/assets')
  var renderDefaults = require('./lib/render-defaults')
  renderDefaults.add({ pretty: true })
  app.use(renderDefaults)
  app.use(assets.stylus)
  app.use(assets.cssPleeease)
  app.use(express.static(path.join(__dirname, 'public')))
}

var controllers = require('./lib/controllers')

app.get('/', controllers.home.index)
app.get('/search', controllers.search.index)

app.listen(process.env.PORT, function(){
  console.log('><')
})
