const fetch = require('node-fetch')
const cheerio = require('cheerio')

const baseUrl = process.env.PIRATEBAY_HOST || 'http://www.thepiratebay.se.net/'

/**
 * options:
 *   category
 *     0   - all
 *     101 - 699
 *   page
 *     0 - 99
 *   orderBy
 *      1  - name desc
 *      2  - name asc
 *      3  - date desc
 *      4  - date asc
 *      5  - size desc
 *      6  - size asc
 *      7  - seeds desc
 *      8  - seeds asc
 *      9  - leeches desc
 *      10 - leeches asc
*/

const searchDefaultOptions = {
  category: 0,
  page: 0,
  orderBy: 7
}

module.exports.search = function search (query, options) {
  const o = Object.assign({}, searchDefaultOptions, options)
  const url = `${baseUrl}/search/${query}/${o.page}/${o.orderBy}/${o.category}`
  return fetch(url)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res
      const err = new Error(res.statusText)
      err.res = res
      throw err
    })
    .then((res) => res.text())
    .then(parseResults)
}

function parseResults (resultsHTML) {
  const $ = cheerio.load(resultsHTML)
  const rawResults = $('table#searchResult tr:has(a.detLink)')

  const results = rawResults.map(function () {
    const $this = $(this)
    const name = $this.find('a.detLink').text()
    const uploadDate = $this.find('font').text().match(/Uploaded\s(?:<b>)?(.+?)(?:<\/b>)?,/)[1]
    const size = $this.find('font').text().match(/Size (.+?),/)[1]
    const seeders = $this.find('td[align="right"]').first().text()
    const leechers = $this.find('td[align="right"]').next().text()
    const link = baseUrl + $this.find('div.detName a').attr('href')
    const magnetLink = $this.find('a[title="Download this torrent using magnet"]').attr('href')
    const torrentLink = $this.find('a[title="Download this torrent"]').attr('href')

    const category = {
      id: $this.find('center a').first().attr('href').match(/\/browse\/(\d+)/)[1],
      name: $this.find('center a').first().text()
    }

    const subcategory = {
      id: $this.find('center a').last().attr('href').match(/\/browse\/(\d+)/)[1],
      name: $this.find('center a').last().text()
    }

    return {
      name,
      size,
      link,
      category,
      seeders,
      leechers,
      uploadDate,
      magnetLink,
      subcategory,
      torrentLink
    }
  })

  return results.get()
}
