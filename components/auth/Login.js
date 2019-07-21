import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import { Input } from '../shared/Inputs';
import { Button, ButtonDarker } from '../shared/Buttons';
import { Status } from '../shared/StatusBar';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        console.log('User loged in:', email)
    }

    render() {
        return (
            <View style={styles.container}>
                <Status></Status>

                <View style={styles.headerContainer}>
                    <Text style={styles.textMain}>Login into your Paylist</Text>
                </View>

                <View style={styles.inputContainer}>
                    {this.state.errorMessage &&
                        <Text style={styles.textError}>
                            {this.state.errorMessage}
                        </Text>}
                    <Input
                        label="Your Paylist account"
                        placeholder="example@paylist.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}>
                    </Input>
                    <Input
                        label="Password"
                        secureTextEntry
                        placeholder="almost ready"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}>
                    </Input>
                    <Button onPress={this.handleLogin}>Login</Button>
                </View>

                <View style={styles.bottomContainer}>
                    <Text>No account yet? Come on!</Text>
                    <ButtonDarker onPress={() => this.props.navigation.navigate('Signup')}>Sign up</ButtonDarker>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerContainer: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
    },
    bottomContainer: {
        width: '100%',
    },
    textMain: {
        padding: 5,
        color: '#333',
        fontSize: 20,
        fontWeight: '800',
        width: '100%',
    },
    textError: {
        padding: 5,
        color: '#b00020',
        fontSize: 16,
        width: '100%',
    }
})