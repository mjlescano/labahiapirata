var env = require('../env')
var path = require('path')
var stylus = require('stylus')
var nib = require('nib')

function stylToCss(str, file) {
  return stylus(str)
    .set('filename', file)
    .set('compress', env.production)
    .use(nib())
    .import('nib')
}

module.exports = stylus.middleware({
  src: path.join(__dirname, '..', '..', 'app', 'assets', 'css'),
  dest: path.join(__dirname, '..', '..', 'public', 'css/'),
  compile: stylToCss
})