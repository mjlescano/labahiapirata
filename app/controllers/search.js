import tortuga from 'tortuga'
import pretty from 'prettysize'
import Log from '../../lib/log'

let log = new Log('search')

export function index (req, res) {
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

    log.debug(results)

    res.render('search/index', {
      results: results,
      query: query,
      bodyClass: 'search-index'
    })
  })
}
