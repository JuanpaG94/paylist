import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import { Input } from '../shared/Inputs';
import { Button, ButtonDarker } from '../shared/Buttons';
import { Status } from '../shared/StatusBar';

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleSignup = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        console.log('User registered')
    }

    render() {
        return (
            <View style={styles.container}>
                <Status></Status>

                <View style={styles.headerContainer}>
                    <Text style={styles.textMain}>Create a Paylist account</Text>
                </View>

                <View style={styles.inputContainer}>
                    {this.state.errorMessage &&
                        <Text style={styles.textError}>
                            {this.state.errorMessage}
                        </Text>}
                    <Input
                        label="Type an email"
                        placeholder="example@paylist.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}>
                    </Input>
                    <Input
                        label="Think your password"
                        secureTextEntry
                        placeholder="must have at least 6 characters"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}>
                    </Input>
                    <Button onPress={this.handleSignup}>Confirm</Button>
                </View>

                <View style={styles.bottomContainer}>
                    <Text>Already have an account?</Text>
                    <ButtonDarker onPress={() => this.props.navigation.navigate('Login')}>Login</ButtonDarker>
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