# Crossplatform Push-Notifications Demo

This is an example for a Crossplatform Push-Notification setup that works for both Android and iOS.

The example comprises of a server application written in [node.js](https://nodejs.org) that uses the [node-pushnotifications](https://github.com/appfeel/node-pushnotifications) library and a [React Native](https://facebook.github.io/react-native/) app that uses the [react-native-fcm](https://github.com/evollu/react-native-fcm) library.

There is an example [Firebase](https://firebase.google.com/) Android application setup that works out of the box. In order to use your own Firebase application, replace the `google-services.json` in the `app/android`directory with your own.

The iOS setup is incomplete because I currently don't have an active Apple Developer subscription but should be easy to complete by following the documentations.

If you don't want to use Firebase Messaging for your iOS application, you could replace the `react-native-fcm` library with [react-native-push-notification](https://github.com/zo0r/react-native-push-notification).

## Requirements
- [node.js 8.x.x](https://nodejs.org/en/download/current/)
- [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)
- Android or iOS development setup (e.g. [Android Studio](https://developer.android.com/studio/index.html))

## Setup

- Optional: Install yarn (`npm install yarn -g`)
- Run `npm install` or `yarn`

## Run demo application

- Start MongoDB `mongod --dbpath=<yourDbPath>`
- Start server `npm run server`
- Start React Native app packager `npm run app-pkg`
- Connect an Android device or start a simulator
- Run Android app `npm run android`

## What's happening?

After application startup you should see a screen which displays your device token and the information that no notification has been received yet.

The device token should have been sent to the node.js server and stored in the MongoDB.

In order to send a sample push notification to all known device tokens execute `curl http://localhost:3000/push` or open [http://localhost:3000/push](http://localhost:3000/push) in your local browser.

The application should now display _Last notification title: Crossplatform push is working_.

## Open tasks

- Provide sample implementation using [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)
- Make server port and MongoDB connection string configurable
- Style React Native App
- Write tests
