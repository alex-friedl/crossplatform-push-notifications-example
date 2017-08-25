import FCM, { FCMEvent } from 'react-native-fcm';

export default class Push {
  constructor(onTokenReceived) {
    FCM.getFCMToken()
      .then(onTokenReceived)
      .catch((err) => { console.error(err); });
    this.registerRefreshTokenListener(onTokenReceived);
  }

  registerNotificationListener(listener) {
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      listener(notif);
    });
  }

  registerRefreshTokenListener(listener) {
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, listener);
  }

  unregister() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }
}
