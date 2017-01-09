var express = require('express')
var Log = require('./lib/log')
var env = require('./lib/env')
var assets = require('./lib/assets')
var renderDefaults = require('./lib/render-defaults')
var controllers = require('./app/controllers')

const app = express()
const log = new Log()

log.info('· La Bahía Pirata ·')

app.set('views', './app/views')
app.set('view engine', 'jade')
app.set('trust proxy', true)

renderDefaults.add({
  env: env
})

if (env.production) {
  log.debug('Loading production environment.')
  app.use(assets.compression)
}

if (env.development) {
  log.debug('Loading development environment.')
  renderDefaults.add({ pretty: true })
  app.use(assets.stylus)
  app.use(assets.cssPleeease)
}

app.use(express.static('./public'))

app.use(renderDefaults)
app.use(controllers)

app.listen(process.env.PORT, function(){
  log.info(`· ${process.env.PORT} ·`)
})
