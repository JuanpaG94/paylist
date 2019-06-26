import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './shared/Buttons';
import { Status } from './shared/StatusBar';

export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Status></Status>
                <Text style={styles.textMain}>Hello.</Text>
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
        justifyContent: 'center',
        padding: 50,
    },
    textMain: {
        color: '#333',
        fontSize: 32,
        fontWeight: '800',
        padding: 5,
        textAlign: 'center',
        width: '100%',
    },
    labelSignUp: {
        color: '#333',
        fontSize: 16,
        fontWeight: '700',
        padding: 5,
        textAlign: 'center',
        textDecorationLine: 'underline',
        width: '100%',
    }
})