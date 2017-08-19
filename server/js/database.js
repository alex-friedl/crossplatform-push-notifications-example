'use strict';

module.exports = class Database {
  constructor() {
    this.debug = require('debug')('push:database')

    this.mongoose = require('mongoose')
    this.mongoose.Promise = Promise
    this.mongoose.connect('mongodb://localhost/push-demo')
    const db = this.mongoose.connection
    db.on('error', (err) => this.debug('database connection error:', err))
    db.once('open', () => this.debug('Opened connection to MongoDB'))

    const tokenSchema = this.mongoose.Schema({
      token: String
    });
    this.DeviceToken = this.mongoose.model('DeviceToken', tokenSchema)
  }

  saveDeviceToken(token) {
    this.debug('Trying to store new DeviceToken', token)
    const t = new this.DeviceToken({ token: token })
    return t.save()
  }

  async fetchDeviceTokens() {
    const tokens = await this.DeviceToken.find().select('token').exec()
    return tokens.map(d => d.token)
  }
}
