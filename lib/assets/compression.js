import compression from 'compression'

export default compression({
  filter: function(req, res){
    return /javascript/.test(res.getHeader('Content-Type'))
  }
})
