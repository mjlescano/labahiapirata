const renderLayout = require('../layout')

module.exports = async (ctx) => {
  ctx.type = 'html'
  ctx.body = await renderLayout()
}
