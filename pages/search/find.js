const log = require('../../lib/log')
const tpb = require('../../lib/tpb')

module.exports = async (query) => {
  try {
    log.debug(`Searching for: ${query}`)
    const results = await tpb.search(query)
    if (!results || !results.length) {
      log.debug(`Nothing found for: ${query}`)
      return []
    }
    return results
  } catch (err) {
    log.error(err)
    return []
  }
}
