const tpb = require('../../lib/tpb')
const Log = require('../../lib/log')

const log = new Log('search')

module.exports.index = function index (req, res) {
  const query = req.query.query

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
