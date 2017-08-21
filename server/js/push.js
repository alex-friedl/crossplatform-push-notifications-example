'use strict'
const debug = require('debug')('push:notifications')

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
const push = new PushNotifications(settings)

module.exports = class Notifications {
  async sendNotification(tokens) {
    const data = {
      title: 'Crossplattform push is working!',
      body: 'Powered by node.js and React Native'
    }
    try {
      const results = await push.send(tokens, data)
      debug('Results for sending notifications:', results)
      return Promise.resolve(results)
    } catch (err) {
      debug('Error while sending notifications:', err)
      return Promise.reject(err)
    }
  }
}
