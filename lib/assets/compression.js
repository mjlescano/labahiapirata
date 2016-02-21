var compression = require('compression')

module.exports = compression({
  filter: function(req, res){
    return /javascript/.test(res.getHeader('Content-Type'))
  }
})
