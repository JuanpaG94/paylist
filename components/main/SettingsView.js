import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom components
import { Status } from '../shared/StatusBar';
import { ButtonDarker } from '../shared/Buttons';

export default class SettingsView extends Component {
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
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Settings</Text>
                        <Ionicons style={styles.headerIconShape} name="ios-more" size={26} color="#6200ee" />
                    </View>

                    <Text>
                        Hey {currentUser && currentUser.email}
                    </Text>
                    <Text>
                        Your UID is {currentUser && currentUser.uid}
                    </Text>

                </ScrollView>

                <View style={styles.bottomBarOptions}>
                    <ButtonDarker style={styles.buttonLogout} onPress={this.handleLogout}>Logout</ButtonDarker>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
        paddingTop: 18,
        width: '100%',
    },
    headerLabel: {
        color: '#263238',
        fontSize: 22,
        fontWeight: '800',
    },
    headerIconShape: {
        backgroundColor: "#cecece70",
        borderRadius: 20,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
    },
    cardsContainer: {
        alignItems: 'center',
        padding: 20,
    },
    buttonLogout: {
        alignItems: 'flex-end',
    },
    bottomBarOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
        width: '100%',
    },
})