import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Card = ({ label, price, description, account, expireDate, color }) => {
  return (
    <View style={[styles.container, { 'backgroundColor': color }, { 'shadowColor': color }]}>

      <View style={styles.mainSectionContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.price}>{price}€</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.bottomSectionContainer}>
        <Text style={styles.accountLabel}>account</Text>
        <Text style={styles.expireDateLabel}>next bill</Text>
      </View>

      <View style={styles.bottomSectionContainer}>
        <Text style={styles.account}>{account}</Text>
        <Text style={styles.expireDate}>{expireDate}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 10,
    padding: 18,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1.0,
    shadowRadius: 5,
    width: '100%',
  },
  mainSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  bottomSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  label: {
    color: '#263238',
    fontSize: 19,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  price: {
    color: '#263238',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  description: {
    color: '#263238',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 25,
  },
  account: {
    color: '#263238',
    fontSize: 12,
    letterSpacing: 1,
  },
  accountLabel: {
    color: '#263238',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  expireDate: {
    color: '#263238',
    fontSize: 12,
    letterSpacing: 1,
  },
  expireDateLabel: {
    color: '#263238',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export { Card };