import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom components
import { Status } from '../shared/StatusBar';
import { ButtonDarker } from '../shared/Buttons';
import { Fonts } from '../../utils/variables';

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
            <View style={styles.container}>
                <View style={styles.viewHeaderContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Settings</Text>
                        <Ionicons style={styles.headerIconShape} name="ios-more" size={26} color="#6200ee" />
                    </View>
                </View>

                <View style={styles.options}>
                    <Text>
                        Hey {currentUser && currentUser.email}
                    </Text>
                    <Text>
                        Your UID is {currentUser && currentUser.uid}
                    </Text>

                    <Text>Warranty time is 2 years in the European Union.</Text>
                </View>

                <View style={styles.bottomBarOptions}>
                    <ButtonDarker style={styles.buttonLogout} onPress={this.handleLogout}>Logout</ButtonDarker>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
        paddingTop: 33.5,
        width: '100%',
    },
    headerLabel: {
        color: '#263238',
        fontFamily: Fonts.InterBlack,
        fontSize: 22,
    },
    headerIconShape: {
        backgroundColor: "#cecece70",
        borderRadius: 20,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
    },
    viewHeaderContainer: {
        alignItems: 'center',
    },
    options: {
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonLogout: {
        alignItems: 'flex-end',
    },
    bottomBarOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
})