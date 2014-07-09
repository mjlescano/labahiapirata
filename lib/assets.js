var onDevelopment = process.env.NODE_ENV === 'development'
var onProduction = process.env.NODE_ENV === 'production'

var path = require('path')
var url = require('url')
var fs = require('fs')

;(function(){
  var stylus = require('stylus')
  var nib = require('nib')

  function stylToCss(str, file) {
    return stylus(str)
      .set('filename', file)
      .set('compress', onProduction)
      .use(nib())
      .import('nib')
  }

  exports.stylToCss = stylus.middleware({
    src: path.join(__dirname, '..', 'app', 'assets', 'css'),
    dest: path.join(__dirname, '..', 'public', 'css/'),
    compile: stylToCss
  })
})()

;(function(){
  var pleeease = require('pleeease')

  exports.cssPleeease = function cssPleeease(req, res, next){
    if( 'GET' != req.method && 'HEAD' != req.method ) return next()
    var cssPath = url.parse(req.url).pathname

    if( /\.css$/.test(cssPath) ){
      var file = path.join(__dirname, '..', 'public', cssPath)
      var css = fs.readFileSync(file, 'utf8')
      var fixed = pleeease.process(css, {
        optimizers: {
          minifier: onProduction
        }
      })
      fs.writeFileSync(file, fixed)
    }
    next()
  }
})()