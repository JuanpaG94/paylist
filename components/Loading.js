import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Landing')
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})