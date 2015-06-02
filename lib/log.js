import debug from 'debug'
import config from './config'

let base = 'lbp'

let logLevels = [
  'critical',
  'error',
  'warn',
  'info',
  'debug',
]

let logLevel = logLevels.indexOf(config.DEBUG)

if (logLevel > -1) {
  let scope = logLevels.slice(0, logLevel + 1)
    .map(l => `${base}:${l}`)
    .join(',')
  debug.enable(scope)
} else if (config.DEBUG === '*') {
  debug.enable(`${base}:*`)
} else if (config.DEBUG) {
  debug.enable(config.DEBUG)
}

export default class Log {
  constructor (scope) {
    logLevels.forEach(level => {
      let baseScope = `${base}:${level}`
      if (scope) baseScope += `:${scope}`
      this[level] = debug(baseScope)
    })
  }
}
