import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom components
import { Status } from '../../shared/StatusBar';
import { Button, FloatingActionButton } from '../../shared/Buttons';

export default class CreateSubscriptionsView extends Component {
    state = {
        currentUser: null,
        errorMessage: null
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render() {
        const { currentUser } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>New subscription</Text>
                        <Ionicons style={styles.headerIconShape} name="ios-close" size={26} color="black" />
                    </View>

                    <Text>
                        This is the create view {currentUser && currentUser.email}
                    </Text>

                    <Button style={styles.buttonLogout} onPress={this.handleLogout}>Logout</Button>

                </ScrollView>

                <FloatingActionButton onPress={this.handleAdd}>SAVE</FloatingActionButton>
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
    }
})