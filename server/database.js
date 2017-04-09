module.exports = class Database {
  constructor () {
    this.debug = require('debug')('push:database')

    this.mongoose = require('mongoose')
    this.mongoose.Promise = Promise
    this.mongoose.connect('mongodb://localhost/push-demo')
    const db = this.mongoose.connection
    db.on('error', (err) => this.debug('database connection error:', err))
    db.once('open', () => this.debug('Opened connection to MongoDB'))

    this.DeviceToken = this.mongoose.model('DeviceToken', { token: String })
  }

  saveDeviceToken (token) {
    this.debug('Trying to store new DeviceToken', token)
    const t = new this.DeviceToken(token)
    return t.save(token)
  }
}
