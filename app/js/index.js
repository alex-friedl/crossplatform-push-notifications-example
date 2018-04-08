/* eslint react/jsx-filename-extension: "off" */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import PushFCM from './fcm';
import PushRN from './rn-push';

const Push = Config.PUSH_LIB === 'fcm' ? PushFCM : PushRN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const sendTokenToServer = (token) => {
  console.log(`Sending token ${token} to server`);
  fetch(`${Config.SERVER_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: token,
  })
    .then(() => { console.log('Successfully sent token'); })
    .catch((err) => { console.error('Failed to send token', err); });
};

export default class App extends Component {
  constructor(props) {
    super(props);
    const onTokenReceived = (token) => { this.handleTokenUpdate(token); };
    this.push = new Push(onTokenReceived);
    this.push.registerNotificationListener((notification) => {
      this.onNotificationReceived(notification);
    });
    this.state = {
      token: 'No device token registered yet.',
      notification: 'No notification received yet',
    };
  }

  componentWillUnmount() {
    this.push.unregister();
  }

  async onNotificationReceived(notification) {
    console.log('Received push notification', notification);
    this.setState({ notification: notification.title });
  }

  handleTokenUpdate(token) {
    console.log('Received token', token);
    this.setState({ token });
    sendTokenToServer(token);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
                    Crossplatform Push Demo
        </Text>
        <Text style={styles.instructions}>
                    Using {this.push.wrappedLibrary}
        </Text>
        <Text style={styles.instructions}>
                    Device Token: {this.state.token}
        </Text>
        <Text style={styles.instructions}>
                    Last notification title: {this.state.notification}
        </Text>
      </View>
    );
  }
}
