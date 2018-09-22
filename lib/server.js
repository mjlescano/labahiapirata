const Koa = require('koa')
const compress = require('koa-compress')
const helmet = require('koa-helmet')

const app = new Koa()

// Set trustProxy to true if your app is running behind a Proxy
app.proxy = process.env.TRUST_PROXY === 'true'

app.use(compress())

app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())

// the CSP module sets the Content-Security-Policy header which can help
// protect against malicious injection of JavaScript, CSS, plugins, and more.
// https://helmetjs.github.io/docs/csp/
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"],
    styleSrc: ["'unsafe-inline'"],
    upgradeInsecureRequests: process.env.PROTOCOL === 'https'
  },
  loose: false
}))

// The Referrer Policy module can control the behavior of the Referer header
// by setting the Referrer-Policy header.
// https://helmetjs.github.io/docs/referrer-policy/
app.use(helmet.referrerPolicy({
  policy: 'no-referrer'
}))

module.exports = app
