var express = require('express')
var home = require('./home')
var search = require('./search')

const router = express.Router()

router.get('/', home.index)
router.get('/search', search.index)

module.exports = router
