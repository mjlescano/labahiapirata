module.exports = function(req, res, next) {
  if( req.headers.host.slice(0, 4) === 'www.' ){
    var newHost = req.headers.host.slice(4)
    return res.redirect(req.protocol + '://' + newHost + req.originalUrl)
  }
  next()
}