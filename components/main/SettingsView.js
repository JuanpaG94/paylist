import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom components
import { Status } from '../shared/Status';
import { ButtonDarker } from '../shared/Buttons';
import { Fonts, Colors } from '../../utils/variables';

export default class SettingsView extends Component {
    state = {
        currentUser: null,
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.navigation.navigate('Loading');
            })
            .catch(error => console.log(error))
        console.log('User disconnected')
    }

    componentWillUnmount() {
        this.setState({ currentUser: null });
    }

    render() {
        const { currentUser } = this.state

        return (
            <View style={styles.container}>
                <View style={styles.viewHeaderContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>About</Text>
                    </View>
                </View>

                <View style={styles.options}>
                    <Image style={{ width: 400, height: 212, opacity: 0.4 }} source={require('../../assets/img/logo-big.png')} />
                    <Text style={styles.labelText}>
                        v1.0 - Logged as {currentUser && currentUser.email}
                    </Text>
                    <Text style={styles.labelText}>
                        Paylist was possible thanks to:
                    </Text>
                    <View style={styles.acknowledgment}>
                        <Text style={styles.labelText}>JavaScript</Text>
                        <Ionicons name="logo-javascript" size={22} color={Colors.TextDark} />
                    </View>
                    <View style={styles.acknowledgment}>
                        <Text style={styles.labelText}>React Native</Text>
                        <Image style={{ width: 20, height: 20, alignSelf: 'center' }} source={require('../../assets/img/logo-react.png')} />
                    </View>
                    <View style={styles.acknowledgment}>
                        <Text style={styles.labelText}>Firebase</Text>
                        <Ionicons name="flame" size={22} color={Colors.TextDark} />
                    </View>
                </View>

                <View style={styles.bottomBarOptions}>
                    <Text style={styles.labelText}>
                        Escuela Técnica Superior de Ingeniería Informática
                    </Text>
                    <Text style={styles.labelText}>
                        Trabajo fin de grado. Universidad de Sevilla
                    </Text>
                    <Text style={styles.labelText}>
                        2018-19 Juan Pablo González
                    </Text>
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
        height: '60%',
        justifyContent: 'space-around',
        textAlign: 'center',
    },
    acknowledgment: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },
    labelText: {
        alignSelf: 'center',
        color: Colors.TextDark,
        fontFamily: Fonts.InterMedium,
        fontSize: 12,
        paddingBottom: 5,
        paddingTop: 5,
    },
    buttonLogout: {
        alignItems: 'flex-end',
    },
    bottomBarOptions: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
})