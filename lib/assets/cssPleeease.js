var env = require('../env')
var path = require('path')
var url = require('url')
var fs = require('fs')
var pleeease = require('pleeease')

function cssPleeease(req, res, next){
  if( 'GET' != req.method && 'HEAD' != req.method ) return next()
  var cssPath = url.parse(req.url).pathname

  if( /\.css$/.test(cssPath) ){
    var file = path.join(__dirname, '..', '..', 'public', cssPath)
    var css = fs.readFileSync(file, 'utf8')
    var fixed = pleeease.process(css, {
      optimizers: {
        minifier: env.production
      }
    })
    fs.writeFileSync(file, fixed)
  }
  next()
}

module.exports = cssPleeease