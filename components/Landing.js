import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom fonts
import { Fonts, Colors } from '../utils/variables';
// Custom components
import { Button } from './shared/Buttons';
import { Status } from './shared/StatusBar';

export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Status></Status>
                <Text style={styles.labelMain}>Welcome.</Text>
                <Text style={styles.labelDesc}>Never forget again what are you paying for.</Text>
                <Button onPress={() => this.props.navigation.navigate('Signup')}>Register</Button>
                <Text style={styles.labelSignUp} onPress={() => this.props.navigation.navigate('Login')}>Already have an account? Login</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 50,
    },
    labelMain: {
        color: Colors.PrimaryDarker,
        fontFamily: Fonts.InterBlack,
        fontSize: 24,
        padding: 5,
        width: '100%',
    },
    labelDesc: {
        color: Colors.TextDark,
        fontFamily: Fonts.InterBold,
        fontSize: 16,
        padding: 5,
        width: '100%',
    },
    labelSignUp: {
        color: Colors.TextDark,
        fontSize: 14,
        fontFamily: Fonts.InterBold,
        padding: 5,
        textDecorationLine: 'underline',
        width: '100%',
    }
})