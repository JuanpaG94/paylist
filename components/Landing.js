import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom fonts
import { Fonts } from '../utils/fonts';
// Custom components
import { Button } from './shared/Buttons';
import { Status } from './shared/StatusBar';

export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Status></Status>
                <Text style={styles.textMain}>Hello.</Text>
                <Text style={styles.labelDesc}>Never forget again what you paying for.</Text>
                <Button onPress={() => this.props.navigation.navigate('Login')}>Login</Button>
                <Text style={styles.labelSignUp} onPress={() => this.props.navigation.navigate('Signup')}>No account yet? Sign up now!</Text>
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
    textMain: {
        color: '#263238',
        fontFamily: Fonts.InterBlack,
        fontSize: 22,
        padding: 5,
        width: '100%',
    },
    labelDesc: {
        color: '#263238',
        fontFamily: Fonts.InterBold,
        fontSize: 16,
        padding: 5,
        width: '100%',
    },
    labelSignUp: {
        color: '#263238',
        fontSize: 14,
        fontFamily: Fonts.InterBold,
        padding: 5,
        textDecorationLine: 'underline',
        width: '100%',
    }
})