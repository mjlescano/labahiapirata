const path = require('path')
const { listFolders, isFile } = require('./fs')

const noop = () => {}

const createPageLoader = (location) => {
  const init = (async () => {
    if (!await isFile(location)) return noop
    return require(location)
  })()

  return async (...args) => {
    const fn = await init
    return fn(...args)
  }
}

module.exports = () => {
  const pages = {}

  const init = (async () => {
    const ROOT = path.resolve(__dirname, '..', 'pages')
    const pageNames = await listFolders(ROOT)

    const loadPages = pageNames.map((name) => {
      const base = path.join(ROOT, name)
      pages[name] = createPageLoader(path.join(base, 'index.js'))
    })

    return Promise.all(loadPages)
  })()

  return async (ctx, next) => {
    await init

    const { method, path } = ctx

    if (method !== 'GET') return next()

    const name = path.slice(1) || 'home'

    if (!pages.hasOwnProperty(name)) return next()

    await pages[name](ctx, next)
  }
}
