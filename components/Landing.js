import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './shared/Buttons';

export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => this.props.navigation.navigate('Login')}>Login</Button>
                <Text style={styles.textMain} onPress={() => this.props.navigation.navigate('Signup')}>No account yet? Tap here to signup now!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    textMain: {
        color: '#333',
        fontSize: 16,
        fontWeight: '800',
        padding: 5,
        textDecorationLine: 'underline',
        width: '100%',
    }
})