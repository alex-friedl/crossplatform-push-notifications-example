/* eslint class-methods-use-this: "off" */

import PushNotification from 'react-native-push-notification';
import { Platform, PushNotificationIOS } from 'react-native';

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
    if (Platform.OS === 'ios') {
      PushNotification.onNotification = (notification) => {
        listener(notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      };
    } else {
      PushNotification.onNotification = listener;
    }
  }

  unregister() {
    PushNotification.unregister();
  }
}
