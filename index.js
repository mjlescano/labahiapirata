const server = require('./lib/server')
const log = require('./lib/log')
const pages = require('./lib/pages')
const requestLogger = require('./lib/request-logger')

const PORT = Number(process.env.PORT) || 3000

log.info('· La Bahía Pirata ·')
log.info(`     · ${PORT} ·    `)

server.use(requestLogger())
server.use(pages())

server.listen(PORT)
