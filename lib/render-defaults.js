/**
 * Override res.render to do any pre/post processing
 */
module.exports = function(app, defaults){
  var _ = require('lodash')

  app.use(function(req, res, next) {
    var render = res.render
    res.render = function(view, options, fn) {
      var self = this,
        options = options || {},
        req = this.req,
        app = req.app,
        defaultFn

      if( defaults ) _.defaults(options, defaults)

      if ('function' == typeof options) {
        fn = options, options = {}
      }

      defaultFn = function(err, str){
        if (err) return req.next(err)
        self.send(str)
      }

      if ('function' != typeof fn) {
        fn = defaultFn
      }

      render.call(self, view, options, function(err, str) {
        fn(err, str)
      })
    }
    next()
  })
}