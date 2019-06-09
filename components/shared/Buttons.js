import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6200ee',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: "#6200ee",
    shadowOffset : { width: 1, height: 13},
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  buttonDarker: {
    alignItems: 'center',
    backgroundColor: '#3700b3',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: "#3700b3",
    shadowOffset : { width: 1, height: 13},
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  buttonSecondary: {
    alignItems: 'center',
    backgroundColor: '#00aeef',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: "#00aeef",
    shadowOffset : { width: 1, height: 13},
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  buttonError: {
    alignItems: 'center',
    backgroundColor: '#b00020',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowColor: "#b00020",
    shadowOffset : { width: 1, height: 13},
    shadowOpacity: 1.5,
    shadowRadius: 20,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  }
});

export { Button, ButtonDarker, ButtonSecondary, ButtonError };