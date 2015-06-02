import express from 'express'
import * as home from './home'
import * as search from './search'

let router = express.Router()

router.get('/', home.index)
router.get('/search', search.index)

export default router
