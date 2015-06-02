var config = require('./config')

exports[config.NODE_ENV || 'production'] = true
