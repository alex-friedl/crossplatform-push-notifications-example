'use strict'

module.exports = class Notifications {
  constructor () {
    this.debug = require('debug')('push:notifications')
    const settings = {
      gcm: {
        id: 'null'
      },
      apn: {
        token: {
          key: './certs/key.p8',
          keyId: 'ABCD',
          teamId: 'EFGH'
        }
      }
    }
    const PushNotifications = new require('node-pushnotifications') // eslint-disable-line
    this.push = new PushNotifications(settings)
  }

  sendNotification (tokens) {
    const data = {
      title: 'Crossplattform push is working!',
      body: 'Powered by node.js and React Native'
    }
    this.push.send(tokens, data)
      .then(results => this.debug('Results for sending notifications:', results))
      .catch(err => this.debug('Error while sending notifications:', err))
  }
}
