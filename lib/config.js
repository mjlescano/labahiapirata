var dotenv = require('dotenv')
var fs = require('fs')
var path = require('path')

var file = fs.readFileSync(path.resolve(__dirname, '..', '.env'))

var config = module.exports = dotenv.parse(file)

// Hack, tortuga no me deja configurar el host
process.env.PIRATEBAY_HOST = config.PIRATEBAY_HOST
