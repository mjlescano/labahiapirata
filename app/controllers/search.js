var tortuga = require('tortuga')
var pretty = require('prettysize')

exports.index = function(req, res) {
  var query = req.query.query

  if( !query ) return res.redirect(301, '/')

  tortuga.search({
    query: query,
    sortType: 7,
  }, function(results){
    results = results.map(function(torrent){
      torrent.size = pretty(torrent.bytes)
      return torrent
    })
    res.render('search/index', {
      results: results,
      query: query,
      bodyClass: 'search-index'
    })
  })
}