var tortuga = require('tortuga');

exports.index = function(req, res) {
  tortuga.search({
    query: req.query.query,
    sortType: 7,
  }, function(results) {
    return res.json(results)
    res.render('search/index', {
      results: results
    })
  })
}