var path = require('path')
var glob = require('glob')

var folder = path.resolve(__dirname, '../app/controllers')

glob.sync(path.resolve(folder, '*.js'))
  .forEach(function(controller){
    var name = path.basename(controller, '.js')
    exports[name] = require(controller)
  })
