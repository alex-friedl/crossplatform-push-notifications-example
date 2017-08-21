'use strict'

module.exports = class Notifications {
  constructor () {
    this.debug = require('debug')('push:notifications')
    const settings = {
      gcm: {
        id: 'AAAA9U3NkO8:APA91bE9XnPD1WQGYle0dbJs6KO6HmAq_73f_z2PHoPr3sbRovXbn9q-PyJAKYlxgNI88rBpTzNWCXRuxhX9FcwbDBhT4h0BAiJr4BiEx8uSkWHXM92q04Q6cydK-dHGSnR20bsgH0Lg'
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
      .then(results => {
        this.debug('Results for sending notifications:', results)
      })
      .catch(err => this.debug('Error while sending notifications:', err))
  }
}
