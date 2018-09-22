const cheerio = require('cheerio')
const getStream = require('get-stream')
const needle = require('needle')
const trumpet = require('trumpet')

const { TORRENT_DOMAIN = 'https://www.skytorrents.lol/' } = process.env

exports.search = (query) => new Promise((resolve, reject) => {
  const tr = trumpet()
  const results = []

  tr.selectAll('#results .result', async (str) => {
    try {
      const row = await getStream(str.createReadStream())
      const cols = cheerio('td', row)

      const titleLinks = cols.eq(0).find('a')

      const result = {
        name: titleLinks.eq(0).text(),
        magnetLink: titleLinks.eq(2).attr('href'),
        category: titleLinks.eq(3).text(),
        subcategory: titleLinks.eq(4).text(),
        size: cols.eq(1).text(),
        seeders: Number(cols.eq(4).text()) || 0,
        leechers: Number(cols.eq(5).text()) || 0
      }

      results.push(result)
    } catch (err) {
      reject(err)
    }
  })

  const res = needle.get(`${TORRENT_DOMAIN}?query=${query}`)

  res.pipe(tr)

  res.on('done', (err) => {
    if (err) return reject(err)
    resolve(results)
  })
})
