import React, { Component } from 'react';
import {Alert, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import { Input } from '../shared/Inputs';
import { Button, ButtonSecondary } from '../shared/Buttons';
import { Status } from '../shared/StatusBar';

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleSignup = () => {
        if (this.state.email == '' || this.state.password == '') {
            const message = 'Name and password cannot be empty. Please, enter a valid credentials to register!';
            this.showAlert(message);
        } else {
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        console.log('User registered')
        }
    }

    showAlert = (message) => {
        Alert.alert(
            'Oops!',
            message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Status></Status>

                <View style={styles.headerContainer}>
                    <Text style={styles.textMain}>New Paylist account</Text>
                </View>

                <View style={styles.inputContainer}>
                {this.state.errorMessage &&
                        <Text style={styles.textError}>
                            Oops! {this.state.errorMessage}
                        </Text>}
                    <Input
                        label="Type an email"
                        placeholder="example@paylist.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}>
                    </Input>
                    <Input
                        label="Think a password"
                        secureTextEntry
                        placeholder="must have at least 6 characters"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}>
                    </Input>

                    <Text style={styles.textConfirmation}>These are your login credentials. 
                    Confirming implies that you agree with the terms and conditions.</Text>
                    <Button onPress={this.handleSignup}>Confirm</Button>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.textLabel}>Already have an account?</Text>
                    <ButtonSecondary onPress={() => this.props.navigation.navigate('Login')}>Login</ButtonSecondary>
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
        justifyContent: 'space-around',
        paddingBottom: 25,
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 25,
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
        color: Colors.PrimaryDarker,
        fontFamily: Fonts.InterBlack,
        fontSize: 22,
        width: '100%',
    },
    textConfirmation: {
        color: Colors.TextDark,
        fontSize: 12,
        fontFamily: Fonts.InterRegular,
        paddingTop: 25,
    },
    textLabel: {
        color: Colors.TextDark,
        fontSize: 12,
        fontFamily: Fonts.InterSemiBold,
    },
    textError: {
        color: Colors.Error,
        fontFamily: Fonts.InterSemiBold,
        fontSize: 14,
        paddingTop: 12,
        width: '100%',
    }
})