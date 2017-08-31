import PushNotification from 'react-native-push-notification';

export default class Push {
  constructor(onTokenReceived) {
    this.wrappedLibrary = 'react-native-push-notification';
    PushNotification.configure({
      onRegister: (token) => {
        onTokenReceived(token.token);
      },
      senderID: '1053572305135',
    });
  }

  registerNotificationListener(listener) {
    PushNotification.onNotification = listener;
  }

  unregister() {
    PushNotification.unregister();
  }
}
