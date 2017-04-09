const SERVER_PORT = 3000

const debug = require('debug')('push:server')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-body-parser')

const Database = require('./database.js')
const db = new Database()

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(router.routes())

router.post('/token', async ctx => {
  const token = ctx.request.body
  debug('Received new device token', token)
  await db.saveDeviceToken(token)
  ctx.status = 201
})

app.listen(SERVER_PORT, () => { debug('Server started. Listening on port', SERVER_PORT) })
