import express from 'express'
import config from './lib/config'
import Log from './lib/log'
import env from './lib/env'
import assets from './lib/assets'
import renderDefaults from './lib/render-defaults'
import controllers from './app/controllers'

let app = express()
let log = new Log()

log.info('La Bahía Pirata.')

app.set('views', './app/views')
app.set('view engine', 'jade')
app.set('trust proxy', true)

renderDefaults.add({
  config: config,
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
  app.use(express.static('./public'))
}

app.use(renderDefaults)
app.use(controllers)

app.listen(config.PORT, function(){
  log.info(`· ${config.PORT} ·`)
})
