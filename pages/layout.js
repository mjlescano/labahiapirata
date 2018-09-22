const raw = require('nanohtml/raw')
const html = require('nanohtml')

module.exports = ({ title, query = '', content = '' } = {}) => html`
  <!DOCTYPE html>
  <html>
  <head>
    <title>${title ? title + ' | ' : ''}La Bahía Pirata</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <style>body { background-color: #fafafa }</style>
  </head>
  <body>
    <header>
    <label for="search-query">
      <h1>
        <span class="t">La Bahía Pirata</span>
        <span class="h">|</span>
        <span class="h th">The Pirate Bay Proxy</span>
      </h1>
    </label>
    <form action="/search">
      <div class="input-wrapper">
        <input
          id="search-query"
          type="text"
          name="query"
          title="Búsqueda Pirata"
          value="${query}"
          autofocus
        >
      </div>
      <button type="submit">Buscar</button>
    </form>
    </header>
    ${raw(content)}
  </body>
  </html>
`.toString()
