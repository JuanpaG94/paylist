import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'react-native-firebase';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import { Input } from '../shared/Inputs';
import { Button, ButtonSecondary } from '../shared/Buttons';
import { Status } from '../shared/Status';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state
        if (email == '' || password == '') {
            const message = 'Name and password cannot be empty. Please, enter your credentials to login!';
            this.showAlert(message);
        } else {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        console.log('User loged in:', email)
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
                <Image style={{ width: 400, height: 360, position: 'absolute', top: 150, opacity: 0.15 }} source={require('../../assets/img/bg-cards.png')} />

                <View style={styles.headerContainer}>
                    <Text style={styles.textMain}>Paylist access</Text>
                </View>

                <View style={styles.inputContainer}>
                {this.state.errorMessage &&
                        <Text style={styles.textError}>
                            Oops! {this.state.errorMessage}
                        </Text>}
                    <Input
                        label="Your email account"
                        placeholder="account@example.com"
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
                    <Text style={styles.textLabel}>No account yet? Sign up now!</Text>
                    <ButtonSecondary onPress={() => this.props.navigation.navigate('Signup')}>Sign up</ButtonSecondary>
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
        paddingLeft: 45,
        paddingRight: 45,
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
    textLabel: {
        color: Colors.TextDark,
        fontSize: 12,
        fontFamily: Fonts.InterSemiBold,
    },
    textError: {
        color: Colors.Error,
        fontFamily: Fonts.InterSemiBold,
        fontSize: 14,
        width: '100%',
    }
})