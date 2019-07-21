import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Card = ({ label, price, description, account, expireDate, color }) => {
  return (
    <View style={[stylesCard.container, { 'backgroundColor': color }, { 'shadowColor': color }]}>

      <View style={stylesCard.mainSectionContainer}>
        <Text style={stylesCard.label}>{label}</Text>
        <Text style={stylesCard.price}>{price}€</Text>
      </View>

      <Text style={stylesCard.description}>{description}</Text>

      <View style={stylesCard.bottomSectionContainer}>
        <Text style={stylesCard.accountLabel}>account</Text>
        <Text style={stylesCard.expireDateLabel}>next bill</Text>
      </View>

      <View style={stylesCard.bottomSectionContainer}>
        <Text style={stylesCard.account}>{account}</Text>
        <Text style={stylesCard.expireDate}>{expireDate}</Text>
      </View>

    </View>
  )
}

const CardTicket = ({ label, price, description, purchaseDate, expireDate }) => {
  return (
    <View style={stylesCardTicket.container}>

      <View style={stylesCardTicket.mainSectionContainer}>
        <Text style={stylesCardTicket.label}>{label}</Text>
        <Text style={stylesCardTicket.price}>{price}€</Text>
      </View>

      <Text style={stylesCardTicket.description}>{description}</Text>

      <View style={stylesCardTicket.bottomSectionContainer}>
        <Text style={stylesCardTicket.purchaseDateLabel}>purchase date</Text>
        <Text style={stylesCardTicket.expireDateLabel}>expires on</Text>
      </View>

      <View style={stylesCardTicket.bottomSectionContainer}>
        <Text style={stylesCardTicket.purchaseDate}>{purchaseDate}</Text>
        <Text style={stylesCardTicket.expireDate}>{expireDate}</Text>
      </View>

    </View>
  )
}

const stylesCard = StyleSheet.create({
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

const stylesCardTicket = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderBottomRightRadius: 20,
    elevation: 4,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 10,
    padding: 18,
    shadowColor: '#FAFAFA',
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
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    width:'60%',
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
  purchaseDate: {
    color: '#263238',
    fontSize: 12,
    letterSpacing: 1,
  },
  purchaseDateLabel: {
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

export { Card, CardTicket };