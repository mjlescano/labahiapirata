const path = require('path')
const log = require('./log')

const elapsed = (from) => Date.now() - from

module.exports = ({ without } = {}) => async (ctx, next) => {
  const { method, url } = ctx
  if (without && url.startsWith(without)) return next()
  const startTime = Date.now()
  await next()
  log.info(`${method} ${url} - ${elapsed(startTime)}ms`)
}
