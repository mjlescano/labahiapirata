import fetch from 'node-fetch'
import cheerio from 'cheerio'
import merge from 'mout/object/merge'
import config from './config'

let baseUrl = config.PIRATEBAY_HOST || 'https://thepiratebay.se'

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

let searchDefaultOptions = {
  category: 0,
  page: 0,
  orderBy: 7
}

export function search (query, options) {
  let o = merge(searchDefaultOptions, options)
  let url = `${baseUrl}/search/${query}/${o.page}/${o.orderBy}/${o.category}`
  return fetch(url).then((res) => res.text()).then(parseResults)
}

function parseResults (resultsHTML) {
  let $ = cheerio.load(resultsHTML)
  let rawResults = $('table#searchResult tr:has(a.detLink)')

  let results = rawResults.map(function() {
    let $this = $(this)
    let name = $this.find('a.detLink').text()
    let uploadDate = $this.find('font').text().match(/Uploaded\s(?:<b>)?(.+?)(?:<\/b>)?,/)[1]
    let size = $this.find('font').text().match(/Size (.+?),/)[1]
    let seeders = $this.find('td[align="right"]').first().text()
    let leechers = $this.find('td[align="right"]').next().text()
    let link = baseUrl + $this.find('div.detName a').attr('href')
    let magnetLink = $this.find('a[title="Download this torrent using magnet"]').attr('href')
    let torrentLink = $this.find('a[title="Download this torrent"]').attr('href')

    let category = {
        id: $this.find('center a').first().attr('href').match(/\/browse\/(\d+)/)[1],
        name: $this.find('center a').first().text()
    }

    let subcategory = {
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
