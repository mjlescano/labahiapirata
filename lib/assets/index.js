var glob = require('glob')
var path = require('path')

glob.sync(__dirname + '/!(' + path.basename(module.filename) + ')')
  .forEach(function(file){
    var filename = path.basename(file, '.js')
    exports[filename] = require(path.join(__dirname, filename))
  });
