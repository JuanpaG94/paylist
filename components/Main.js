import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Button } from './shared/Buttons';

export default class Main extends Component {
    state = {
        currentUser: null,
        errorMessage: null
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    handleLogout = () => {
        this.setState({ currentUser: null })
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('Loading'))
            .catch(error => this.setState({ errorMessage: error.message }))
        console.log('User disconnected')
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Welcome back {currentUser && currentUser.email}!
                </Text>
                <Button onPress={this.handleLogout}>Logout</Button>
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
    }
})