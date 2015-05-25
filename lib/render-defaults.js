var fillIn = require('mout/object/fillIn')
var mixIn = require('mout/object/mixIn')
var partial = require('mout/function/partial')

var defaults = {}

function renderDefaults(req, res, next){
  var originalRender = res.render
  res.render = function(view, options, fn){
    var self = this
    var req = self.req

    if( typeof options == 'function' ) fn = options
    options = options || {}

    fillIn(options, defaults)

    if( typeof fn != 'function' ){
      fn = function(err, str){
        if( err ) return req.next(err)
        self.send(str)
      }
    }

    originalRender.call(self, view, options, fn)
  }
  next()
}

renderDefaults.add = partial(mixIn, defaults)

module.exports = renderDefaults