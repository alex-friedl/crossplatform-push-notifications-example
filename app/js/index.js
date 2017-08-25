import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Push from './push';

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

function sendTokenToServer(token) {
  console.log(`Sending token ${token} to server`);
  fetch('http://10.0.2.2:3000/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: token,
  })
    .then(() => { console.log('Successfully sent token'); })
    .catch((err) => { console.error('Failed to send token', err); });
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.push = new Push((token) => { this.handleTokenUpdate(token); });
    this.push.registerNotificationListener((notification) => { this.onNotificationReceived(notification); });
    this.state = {
      token: 'No device token registered yet.',
      notification: 'No notification received yet',
    };
  }

  componentWillUnmount() {
    this.push.unregister();
  }

  async onNotificationReceived(notification) {
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
                    Device Token: {this.state.token}
        </Text>
        <Text style={styles.instructions}>
                    Last notification title: {this.state.notification}
        </Text>
      </View>
    );
  }
}
