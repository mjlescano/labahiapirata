var fetch = require('node-fetch')
var cheerio = require('cheerio')
var merge = require('mout/object/merge')
var config = require('./config')

const baseUrl = config.PIRATEBAY_HOST || 'https://thepiratebay.se'

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
  const o = merge(searchDefaultOptions, options)
  const url = `${baseUrl}/search/${query}/${o.page}/${o.orderBy}/${o.category}`
  return fetch(url).then((res) => res.text()).then(parseResults)
}

function parseResults (resultsHTML) {
  var $ = cheerio.load(resultsHTML)
  var rawResults = $('table#searchResult tr:has(a.detLink)')

  var results = rawResults.map(function() {
    var $this = $(this)
    var name = $this.find('a.detLink').text()
    var uploadDate = $this.find('font').text().match(/Uploaded\s(?:<b>)?(.+?)(?:<\/b>)?,/)[1]
    var size = $this.find('font').text().match(/Size (.+?),/)[1]
    var seeders = $this.find('td[align="right"]').first().text()
    var leechers = $this.find('td[align="right"]').next().text()
    var link = baseUrl + $this.find('div.detName a').attr('href')
    var magnetLink = $this.find('a[title="Download this torrent using magnet"]').attr('href')
    var torrentLink = $this.find('a[title="Download this torrent"]').attr('href')

    var category = {
        id: $this.find('center a').first().attr('href').match(/\/browse\/(\d+)/)[1],
        name: $this.find('center a').first().text()
    }

    var subcategory = {
        id: $this.find('center a').last().attr('href').match(/\/browse\/(\d+)/)[1],
        name: $this.find('center a').last().text()
    }

    return {
      name: name,
      size: size,
      link: link,
      category: category,
      seeders: seeders,
      leechers: leechers,
      uploadDate: uploadDate,
      magnetLink: magnetLink,
      subcategory: subcategory,
      torrentLink: torrentLink
    }
  })

  return results.get()
}
