import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { Fonts, Colors } from '../../utils/variables';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, maxLength }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        value={value}
        maxLength={maxLength}
      />
    </View>
  )
}

const InputNumeric = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType="decimal-pad"
        maxLength={8}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    width: '100%',
  },
  label: {
    color: Colors.TextDark,
    fontFamily: Fonts.InterBold,
    fontSize: 16,
    width: '100%',
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: Colors.WrappersBorderColor,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1.5,
    color: Colors.TextDark,
    fontFamily: Fonts.InterMedium,
    fontSize: 14,
    marginTop: 6,
    paddingBottom: 9,
    paddingLeft: 18,
    paddingTop: 9,
  },
});

export { Input, InputNumeric };