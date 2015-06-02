var nodemon = require('nodemon')
var env = require('./lib/env')

nodemon({
  script: 'server.js',
  ext: 'js json',
  execMap: {
    js: 'babel-node'
  },
})
