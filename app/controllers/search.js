var tortuga = require('tortuga')

exports.index = function(req, res) {
  var query = req.query.query

  if( !query ) return res.redirect('/')

  tortuga.search({
    query: query,
    sortType: 7,
  }, function(results) {
    res.render('search/index', {
      results: results,
      query: query
    })
  })
}