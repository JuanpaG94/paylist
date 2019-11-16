import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import Ionicons from 'react-native-ionicons';

const ButtonSheetOptions = ({ label, onEditPress, onDeletePress }) =>
  <View style={styles.BSViewContainer}>
    <View style={styles.BSHeaderContainer}>
      <Text style={styles.BSLabel}>{label}</Text>
    </View>

    <View style={styles.BSOptionsContainer}>
      <TouchableOpacity onPress={onEditPress} style={styles.BSOptionButton}>
        <Text style={[styles.BSLabelOption, { color: Colors.PrimaryDarker }]}>Edit information</Text>
        <View style={styles.BSIconContainer}>
          <Ionicons name="ios-more" size={26} color={Colors.PrimaryDarker} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDeletePress} style={styles.BSOptionButton}>
        <Text style={[styles.BSLabelOption, { color: Colors.Error }]}>Delete</Text>
        <View style={styles.BSIconContainer}>
          <Ionicons name="ios-trash" size={26} color={Colors.Error} />
        </View>
      </TouchableOpacity>
    </View>
  </View>;

const ButtonSheetMainSettings = ({ account, onOrderBy1Press, onOrderBy2Press, onLogoutPress }) =>
  <View style={styles.BSViewContainer}>
    <View style={styles.BSHeaderContainer}>
      <Text style={styles.BSLabel}>Settings</Text>
    </View>

    <View style={styles.BSOptionsContainer}>
      {onOrderBy1Press ? <TouchableOpacity onPress={onOrderBy1Press} style={styles.BSOptionButton}>
        <Text style={[styles.BSLabelOption, { color: Colors.PrimaryDarker }]}>Sort by name</Text>
        <View style={styles.BSIconContainer}>
          <Ionicons name="ios-list" size={26} color={Colors.PrimaryDarker} />
        </View>
      </TouchableOpacity> : false}

      {onOrderBy2Press ? <TouchableOpacity onPress={onOrderBy2Press} style={styles.BSOptionButton}>
        <Text style={[styles.BSLabelOption, { color: Colors.PrimaryDarker }]}>Sort by purchase date</Text>
        <View style={styles.BSIconContainer}>
          <Ionicons name="ios-calendar" size={26} color={Colors.PrimaryDarker} />
        </View>
      </TouchableOpacity> : false}

      <Text style={[styles.BSLabel, { marginTop: 25, fontSize: 14 }]}>{account}</Text>
      <TouchableOpacity onPress={onLogoutPress} style={styles.BSOptionButton}>
        <Text style={[styles.BSLabelOption, { color: '#b00020' }]}>Logout</Text>
        <View style={styles.BSIconContainer}>
          <Ionicons name="ios-log-out" size={26} color="#b00020" />
        </View>
      </TouchableOpacity>
    </View>
  </View>;

const styles = StyleSheet.create({
  BSViewContainer: {
    padding: 20,
    paddingTop: 5,
    height: '80%'
  },
  BSHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  BSLabel: {
    color: Colors.TextDark,
    fontSize: 16,
    fontFamily: Fonts.InterBlack,
  },
  BSOptionsContainer: {
    justifyContent: 'center',
    height: '100%',
    marginBottom: 5,
  },
  BSOptionButton: {
    alignItems: 'center',
    backgroundColor: Colors.WrappersBoxColor,
    borderColor: Colors.WrappersBorderColor,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 12,
    paddingBottom: 9,
    paddingLeft: 18,
    paddingTop: 9,
  },
  BSLabelOption: {
    fontSize: 14,
    fontFamily: Fonts.InterMedium,
    width: '82%',
  },
  BSIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '18%',
  },
});

export { ButtonSheetOptions, ButtonSheetMainSettings };