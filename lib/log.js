'use strict'

var debug = require('debug')

const base = 'lbp'

const logLevels = [
  'critical',
  'error',
  'warn',
  'info',
  'debug',
]

const logLevel = logLevels.indexOf(process.env.DEBUG)

if (logLevel > -1) {
  const scope = logLevels.slice(0, logLevel + 1)
    .map(l => `${base}:${l},${base}:${l}:*`)
    .join(',')
  debug.enable(scope)
} else if (process.env.DEBUG === '*') {
  debug.enable(`${base}:*`)
} else if (process.env.DEBUG) {
  debug.enable(process.env.DEBUG)
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
