'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

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
  console.log('Sending token to server');
  fetch('http://10.0.2.2:3000/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: token
  })
  .then(res => console.log('Successfully sent token'))
  .catch(err => console.error('Failed to send token'))
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: 'No device token registered yet.' }
  }
  componentDidMount() {
    FCM.getFCMToken()
      .then(token => {
        console.log('Received token', token);
        this.setState({token: token});
        sendTokenToServer(token)
      })
      .catch(err => { console.error(err) });
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
      </View>
    );
  }
}
