var onDevelopment = !!(process.env.NODE_ENV === 'development')
var onProduction = !!(process.env.NODE_ENV === 'production')

var path = require('path')

var assets = {}

;(function(){
  var stylus = require('stylus')
  var nib = require('nib')

  function compile(str, file) {
    return stylus(str)
      .set('filename', file)
      .set('compress', onProduction)
      .use(nib())
      .import('nib')
  }

  assets.css = stylus.middleware({
    debug: onDevelopment,
    src: path.join(__dirname, '..', 'app', 'assets', 'css'),
    dest: path.join(__dirname, '..', 'public', 'css/'),
    compile: compile,
  })
})()


module.exports = assets