module.exports.index = function index (req, res) {
  res.render('home/index', {
    bodyClass: 'home-index'
  })
}