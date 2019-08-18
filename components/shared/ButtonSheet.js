import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Custom fonts
import { Fonts } from '../../utils/fonts';
// Custom components
import Ionicons from 'react-native-ionicons';

const ButtonSheetOptions = ({ label, onClosePress }) => {
  return (
    <View style={styles.BSViewContainer}>
      <View style={styles.BSHeaderContainer}>
        <Text style={styles.BSLabel}>{label}</Text>
        <Ionicons onPress={onClosePress} name="ios-close" size={30} color="#263238" />
      </View>

      <View style={styles.BSOptionsContainer}>
        <TouchableOpacity style={styles.BSOptionButton}>
          <Text style={[styles.BSLabelOption, { color: '#6200ee' }]}>Edit information</Text>
          <View style={styles.BSIconContainer}>
            <Ionicons name="ios-more" size={26} color="#6200ee" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.BSOptionButton}>
          <Text style={[styles.BSLabelOption, { color: '#b00020' }]}>Delete subscription</Text>
          <View style={styles.BSIconContainer}>
            <Ionicons name="ios-trash" size={26} color="#b00020" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  BSViewContainer: {
    padding: 20,
    paddingTop: 5,
    height: '80%'
  },
  BSHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingRight: 5,
  },
  BSLabel: {
    color: '#263238',
    fontSize: 16,
    fontFamily: Fonts.InterBlack,
  },
  BSOptionsContainer: {
    justifyContent: 'center',
    height: '100%'
  },
  BSOptionButton: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: '#cecece20',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 12,
    paddingBottom: 9,
    paddingLeft: 18,
    paddingTop: 9,
  },
  BSLabelOption: {
    color: '#263238',
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

export { ButtonSheetOptions };