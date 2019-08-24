import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
                    <Text style={styles.textMain}>New Paylist account.</Text>
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

                    <Text style={styles.textConfirmation}>These are going to be your Paylist login credentials. 
                    Pressing confirm implies that you are agree with the terms and conditions.</Text>
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
        justifyContent: 'space-evenly',
        padding: 50,
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
        paddingTop: 30,
    },
    textLabel: {
        color: Colors.TextDark,
        fontSize: 14,
        fontFamily: Fonts.InterMedium,
    },
    textError: {
        color: Colors.Error,
        fontFamily: Fonts.InterMedium,
        fontSize: 16,
        padding: 5,
        width: '100%',
    }
})