var tpb = require('thepiratebay')

exports.index = function(req, res) {
  tpb.search(req.query.query)
  .then(function(results){
    console.log(results)

    res.render('search/index', {
      results: results
    })
  })
}