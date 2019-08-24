import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-ionicons';

import { Fonts, Colors } from '../../utils/variables';

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const ButtonDarker = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonDarker}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const ButtonSecondary = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonSecondary}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const ButtonError = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonError}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const FloatingActionButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.floatingActionButton}>
      <Ionicons name="ios-add" size={36} color="white" /><Text style={styles.fabText}>{children ? '  ' + children : ''}</Text>
    </TouchableOpacity>
  )
}

const FloatingActionButtonCancel = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.floatingActionButtonCancel}>
      <Ionicons name="ios-close" size={36} color="white" /><Text style={styles.fabText}>{children ? '  ' + children : ''}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: Colors.Primary,
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  buttonDarker: {
    alignItems: 'center',
    backgroundColor: Colors.PrimaryDarker,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: Colors.PrimaryDarker,
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  buttonSecondary: {
    alignItems: 'center',
    backgroundColor: Colors.TextDark,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: Colors.TextDark,
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  buttonError: {
    alignItems: 'center',
    backgroundColor: Colors.Error,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: Colors.Error,
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  floatingActionButton: {
    alignItems: 'center',
    backgroundColor: Colors.PrimaryDarker,
    borderRadius: 40,
    elevation: 2,
    flexDirection: 'row',
    margin: 5,
    paddingBottom: 6.5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6.5,
    shadowColor: Colors.PrimaryDarker,
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
  },
  floatingActionButtonCancel: {
    alignItems: 'center',
    backgroundColor: Colors.Error,
    borderRadius: 40,
    elevation: 2,
    flexDirection: 'row',
    margin: 5,
    paddingBottom: 6.5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6.5,
    shadowColor: Colors.Error,
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
  },
  text: {
    color: 'white',
    fontFamily: Fonts.InterSemiBold,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  fabText: {
    color: 'white',
    fontFamily: Fonts.InterBold,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
  }
});

export { Button, ButtonDarker, ButtonSecondary, ButtonError, FloatingActionButton, FloatingActionButtonCancel };