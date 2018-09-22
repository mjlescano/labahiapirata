const { LOG_LEVEL } = process.env

const LEVELS = [
  'error',
  'warn',
  'info',
  'debug'
]

const noop = () => {}

const createLogger = (logLevel = 'log', levels = LEVELS) => {
  const logger = {}

  if (logLevel && !levels.includes(logLevel)) {
    const expected = levels.join(', ')
    throw new Error(`Invalid logLevel ${logLevel}. Expected one of: ${expected}.`)
  }

  levels.forEach((level, index) => {
    const enabled = !!logLevel && index <= levels.indexOf(logLevel)
    logger[level] = enabled
      ? console[level === 'info' ? 'log' : level].bind(console)
      : noop
  })

  return logger
}

module.exports = createLogger(LOG_LEVEL || 'debug')
