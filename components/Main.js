import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';

import { Status } from './shared/StatusBar';
import { Button } from './shared/Buttons';
import { Card } from './shared/Card';

class ListSubscriptionsView extends Component {
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
                <Status></Status>
                <Text>
                    Welcome back {currentUser && currentUser.email}!
                </Text>
                <Button onPress={this.handleLogout}>Logout</Button>
            </View>
        )
    }
}

class ListTicketsView extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="#4a148c">
                </Card>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="#4caf50">
                </Card>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="#f06292">
                </Card>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="#f57f17">
                </Card>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="#000000">
                </Card>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="#29b6f6">
                </Card>
                <Card
                    label="Ticket card"
                    description="Ticket card dummy description test"
                    color="white">
                </Card>
            </ScrollView>
        )
    }
}

export default createBottomTabNavigator(
    {
        Subscriptions: ListSubscriptionsView,
        Tickets: ListTicketsView,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Subscriptions') {
                    iconName = `ios-albums`; // ${focused ? '' : '-outline'}` puede ser util en el futuro
                } else if (routeName === 'Tickets') {
                    iconName = `ios-paper`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#6200ee',
            inactiveTintColor: 'gray',
        },
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    cardsContainer:{
        alignItems: 'center',
        padding: 20,
    }
})