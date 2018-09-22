const { parse } = require('query-string')
const renderLayout = require('../layout')
const find = require('./find')
const renderResults = require('./render-results')

module.exports = async (ctx) => {
  const { query } = parse(ctx.querystring)

  if (!query) {
    ctx.status = 301
    return ctx.redirect('/')
  }

  const results = await find(query)

  ctx.type = 'html'

  const content = results.length > 0
    ? renderResults(results)
    : '<h1>&nbsp;:(&nbsp;</h1>'

  ctx.body = renderLayout({
    title: query,
    query,
    content
  })
}
