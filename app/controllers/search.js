import * as tpb from '../../lib/tpb'
import Log from '../../lib/log'

let log = new Log('search')

export function index (req, res) {
  var query = req.query.query

  if( !query ) return res.redirect(301, '/')

  log.debug(`Searching for: ${query}`)

  tpb.search(query).then(function(results){
    log.debug(`Found ${results.length} results for: ${query}`)
    res.render('search/index', {
      results: results,
      query: query,
      bodyClass: 'search-index'
    })
  }).catch(function(err){
    console.log(err)
    log.debug(`Nothing found for: ${query}`)
    res.render('search/index', {
      results: null,
      query: query,
      bodyClass: 'search-index'
    })
  })
}
