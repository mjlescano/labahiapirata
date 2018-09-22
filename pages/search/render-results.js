const raw = require('nanohtml/raw')
const html = require('nanohtml')

const span = (text) => html`<span>${text}</span>`

const renderResult = ({
  magnetLink,
  name,
  category,
  subcategory,
  size,
  seeders,
  leechers
}) => html`
<tr>
  <td><a href="${magnetLink}" title="↓">Link</a></td>
  <td>
    ${name}
    ${category && span(category.name)}
    ${subcategory && span(subcategory.name)}
  </td>
  <td>${size}</td>
  <td>${seeders} · ${leechers}</td>
</tr>
`

module.exports = (results) => html`
  <div class="results-table">
    <table>
      <tbody>
        ${results.map((result) => raw(renderResult(result)))}
      </tbody>
    </table>
  </div>
`
