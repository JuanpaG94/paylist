import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Fonts, Colors } from '../../utils/variables';

const Card = ({ label, price, type, description, account, expireDate, color, onLongPress, purchaseDate }) => 
    <TouchableOpacity onLongPress={onLongPress} style={[stylesCard.container, { 'backgroundColor': color }, { 'shadowColor': color }]}>

      <View style={stylesCard.mainSectionContainer}>
        <Text style={stylesCard.label}>{label}</Text>
        <Text style={stylesCard.price}>{price}€</Text>
      </View>
      <View style={stylesCard.mainSectionContainer}>
        <Text style={stylesCard.purchaseDate}>{purchaseDate}</Text>
        <Text style={stylesCard.purchaseDate}>/{type}</Text>
      </View>

      {description ? <Text style={stylesCard.description}>{description}</Text> : false}

      <View style={stylesCard.bottomSectionContainer}>
        <Text style={stylesCard.accountLabel}>account</Text>
        {expireDate ? <Text style={stylesCard.expireDateLabel}>next bill</Text> : false}
      </View>

      <View style={stylesCard.bottomSectionContainer}>
        <Text style={stylesCard.account}>{account}</Text>
        <Text style={stylesCard.expireDate}>{expireDate}</Text>
      </View>

    </TouchableOpacity>;


const CardTicket = ({ labelShop, label, price, description, purchaseDate, expireDate, color, onLongPress }) => 
    <TouchableOpacity onLongPress={onLongPress} style={stylesCardTicket.container}>

      <View style={[stylesCardTicket.labelShopContainer, { 'backgroundColor': color }, { 'shadowColor': color }]}>
        <Text style={stylesCardTicket.labelShop}>{labelShop}</Text>
      </View>
      <View style={stylesCardTicket.mainSectionContainer}>
        <Text style={stylesCardTicket.label}>{label}</Text>
        <Text style={stylesCardTicket.price}>{price}€</Text>
      </View>

      {description ? <Text style={stylesCardTicket.description}>{description}</Text> : false}

      <View style={stylesCardTicket.bottomSectionContainer}>
        <Text style={stylesCardTicket.purchaseDateLabel}>purchase date</Text>
        <Text style={stylesCardTicket.expireDateLabel}>expires on</Text>
      </View>

      <View style={stylesCardTicket.bottomSectionContainer}>
        <Text style={stylesCardTicket.purchaseDate}>{purchaseDate}</Text>
        <Text style={stylesCardTicket.expireDate}>{expireDate}</Text>
      </View>

    </TouchableOpacity>;

const stylesCard = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3.2,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 10,
    padding: 18,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: '100%',
  },
  mainSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  purchaseDate: {
    color: Colors.TextDark,
    fontFamily: Fonts.InterMedium,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 25,
  },
  bottomSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.TextDark,
    fontSize: 19,
    fontFamily: Fonts.InterBold,
  },
  price: {
    color: Colors.TextDark,
    fontFamily: Fonts.InterMedium,
    fontSize: 18,
    letterSpacing: 1,
  },
  description: {
    color: Colors.TextDark,
    fontSize: 14,
    fontFamily: Fonts.InterRegular,
    letterSpacing: 0.8,
    marginBottom: 25,
  },
  account: {
    color: Colors.TextDark,
    fontFamily: Fonts.InterMedium,
    fontSize: 12,
    letterSpacing: 1,
  },
  accountLabel: {
    color: '#263238',
    fontSize: 10,
    fontFamily: Fonts.InterBlack,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  expireDate: {
    color: Colors.TextDark,
    fontFamily: Fonts.InterMedium,
    fontSize: 12,
    letterSpacing: 1,
  },
  expireDateLabel: {
    color: '#263238',
    fontSize: 10,
    fontFamily: Fonts.InterBlack,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

const stylesCardTicket = StyleSheet.create({
  container: {
    backgroundColor: Colors.WrappersBoxColor,
    borderRadius: 8,
    elevation: 3.1,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 10,
    paddingBottom: 18,
    shadowColor: Colors.TextDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    width: '100%',
  },
  mainSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingLeft: 18,
    paddingRight: 18,
  },
  labelShopContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    paddingTop: 10,
    paddingBottom: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  bottomSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18,
  },
  labelShop: {
    color: Colors.TextDark,
    fontFamily: Fonts.InterBold,
    fontSize: 16,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  label: {
    color: Colors.TextDark,
    fontSize: 14,
    fontFamily: Fonts.InterSemiBold,
    width: '60%',
  },
  price: {
    color: Colors.TextDark,
    fontSize: 18,
    fontFamily: Fonts.InterMedium,
    letterSpacing: 1,
  },
  description: {
    color: Colors.TextDark,
    fontSize: 14,
    fontFamily: Fonts.InterRegular,
    letterSpacing: 0.8,
    marginBottom: 25,
    paddingLeft: 18,
    paddingRight: 18,
  },
  purchaseDate: {
    color: Colors.TextDark,
    fontSize: 12,
    letterSpacing: 1,
  },
  purchaseDateLabel: {
    color: Colors.Primary,
    fontSize: 10,
    fontFamily: Fonts.InterBlack,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  expireDate: {
    color: Colors.TextDark,
    fontSize: 12,
    letterSpacing: 1,
  },
  expireDateLabel: {
    color: Colors.Error,
    fontSize: 10,
    fontFamily: Fonts.InterBlack,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export { Card, CardTicket };