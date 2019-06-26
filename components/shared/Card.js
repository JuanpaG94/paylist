import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Card = ({ label, description, color }) => {
  return (
    <View style={[styles.container, {'backgroundColor': color}, {'shadowColor': color}]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 10,
    marginTop: 10,
    padding: 9,
    shadowOffset: { width: 0,height: 3 },
    shadowOpacity: 1.0,
    shadowRadius: 5,
    width: '100%',
  },
  label: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    padding: 5,
    paddingBottom: 0,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
  }
});

export { Card };