import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// Import screens
import Loading from './components/Loading';
import Landing from './components/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Main from './components/Main';

// App.js code

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
}); */

export default createAppContainer(createSwitchNavigator(
  {
    Loading,
    Landing,
    Signup,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
));

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
