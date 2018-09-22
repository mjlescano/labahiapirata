const log = require('../../lib/log')
const torrent = require('../../lib/torrent')

module.exports = async (query) => {
  try {
    const results = await torrent.search(query)
    return results || []
  } catch (err) {
    log.error(err)
    return []
  }
}
