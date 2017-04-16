const SERVER_PORT = 3000

const debug = require('debug')('push:server')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-body-parser')

const Database = require('./database.js')
const db = new Database()

const Notifications = require('./push.js')
const push = new Notifications()

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(router.routes())

router.post('/token', async ctx => {
  const token = ctx.request.body
  debug('Received new device token', token)
  if (ctx.is('text/plain')) {
    if (typeof token === 'string') {
      ctx.body = await db.saveDeviceToken(token)
      ctx.status = 201
    } else {
      ctx.throw(400, 'Token must be a string')
    }
  } else {
    ctx.throw(415, 'Only text/plain is accepted as Content-Type')
  }
})

router.get('/push', async ctx => {
  debug('Request to send push notifications to device tokens')
  const tokens = await db.fetchDeviceTokens()
  await push.sendNotification(tokens)
  ctx.body = tokens
})

app.listen(SERVER_PORT, () => { debug('Server started. Listening on port', SERVER_PORT) })
