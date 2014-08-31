var _ = require('lodash')
var defaults = {}

function renderDefaults(req, res, next){
  var originalRender = res.render
  res.render = function(view, options, fn){
    var self = this
    var req = self.req
    var app = req.app

    if( typeof options == 'function' ) fn = options
    options = options || {}

    _.defaults(options, defaults)

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

renderDefaults.add = _.partial(_.extend, defaults)

module.exports = renderDefaults