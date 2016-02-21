const kickass = require('kickass-torrent')
const tpb = require('../../lib/tpb')
const Log = require('../../lib/log')

const log = new Log('search')

// module.exports.index = function index (req, res) {
//   const query = req.query.query

//   if( !query ) return res.redirect(301, '/')

//   log.debug(`Searching for: ${query}`)

//   tpb.search(query).then(function(results){
//     log.debug(`Found ${results.length} results for: ${query}`)
//     res.render('search/index', {
//       results: results,
//       query: query,
//       bodyClass: 'search-index'
//     })
//   }).catch(function(err){
//     log.error(err)
//     log.debug(`Nothing found for: ${query}`)
//     res.render('search/index', {
//       results: null,
//       query: query,
//       bodyClass: 'search-index'
//     })
//   })
// }

module.exports.index = function index (req, res) {
  const query = req.query.query

  if( !query ) return res.redirect(301, '/')

  log.debug(`Searching for: ${query}`)

  kickass({
    q: query,
    field:'seeders',
    order:'desc',
    page: 1,
    url: 'https://kat.cr',
  }, function(err, data){
      if (err) return log.error(err)

      if (!data.list.length) {
        log.debug(`Nothing found for: ${query}`)
      } else {
        log.debug(`Found ${data.total_results} results for: ${query}`)
      }

      return res.json(data)
      res.render('search/index', {
        results: data.list,
        query: query,
        bodyClass: 'search-index'
      })

      // res.render('search/index', {
      //   results: results,
      //   query: query,
      //   bodyClass: 'search-index'
      // })
  })
}
