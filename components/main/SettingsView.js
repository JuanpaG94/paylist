import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom components
import { Status } from '../shared/StatusBar';
import { ButtonDarker } from '../shared/Buttons';
import { Fonts, Colors } from '../../utils/variables';

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
                        <Image style={{width: 125, height: 55}} source={require('../../assets/img/logo.png')} />
                    </View>
                </View>

                <View style={styles.options}>
                
                    <Text style={styles.labelText}>
                        Hey {currentUser && currentUser.email}
                    </Text>
                    <Text style={styles.labelText}>
                        This view will store some settings. 
                    </Text>
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
    labelText: {
        color: Colors.TextDark,
        fontFamily: Fonts.InterBold,
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
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