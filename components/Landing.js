import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Custom fonts
import { Fonts, Colors } from '../utils/variables';
// Custom components
import { Button } from './shared/Buttons';
import { Status } from './shared/Status';

export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Status></Status>
                <Image style={{ width: 392, height: 360, position: 'absolute', top: 150, opacity: 0.15 }} source={require('../assets/img/bg-cards.png')} />
                
                <Image style={{ width: 130, height: 60 }} source={require('../assets/img/logo.png')} />
                <View style={styles.labelMain}>
                    <Text style={styles.labelMain}>Welcome.</Text>
                    <Text style={styles.labelDesc}>Never forget again what you are paying for.</Text>
                </View>
                <Button onPress={() => this.props.navigation.navigate('Signup')}>Register</Button>
                <Text style={styles.labelSignUp} onPress={() => this.props.navigation.navigate('Login')}>Already have an account? Login</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'space-evenly',
        paddingLeft: 45,
        paddingRight: 45,
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