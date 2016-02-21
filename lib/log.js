'use strict'

var debug = require('debug')
var config = require('./config')

const base = 'lbp'

const logLevels = [
  'critical',
  'error',
  'warn',
  'info',
  'debug',
]

const logLevel = logLevels.indexOf(config.DEBUG)

if (logLevel > -1) {
  const scope = logLevels.slice(0, logLevel + 1)
    .map(l => `${base}:${l},${base}:${l}:*`)
    .join(',')
  debug.enable(scope)
} else if (config.DEBUG === '*') {
  debug.enable(`${base}:*`)
} else if (config.DEBUG) {
  debug.enable(config.DEBUG)
}

module.exports = class Log {
  constructor (scope) {
    logLevels.forEach(level => {
      var baseScope = `${base}:${level}`
      if (scope) baseScope += `:${scope}`
      this[level] = debug(baseScope)
    })
  }
}
