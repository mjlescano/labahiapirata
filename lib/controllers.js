var path = require('path')
var fs = require('fs')
var files = fs.readdirSync(path.join(__dirname, '..', 'app', 'controllers'))

var controllers = {}

files.forEach(function(file) {
  var name = file.match(/[a-z-]+/)[0]
  var filePath = path.join(__dirname, '..', 'app', 'controllers', file)
  var controller = require(filePath)
  controllers[name] = controller
});

module.exports = controllers