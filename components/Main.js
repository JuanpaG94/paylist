import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';

import { Status } from './shared/StatusBar';
import { Button } from './shared/Buttons';
import { Card } from './shared/Card';

class ListTicketsView extends Component {
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

class ListSubscriptionsView extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <Status></Status>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerLabel}>Subscriptions</Text>
                    <Ionicons style={styles.headerIconShape} name="ios-cog" size={26} color="black" />
                </View>            

                <Card
                    label="Netflix"
                    description="Ticket card dummy description test"
                    price="8"
                    expireDate="03/08/2020"
                    account='asdasd34'
                    color="#ff80ab">
                </Card>
                <Card
                    label="Spotify"
                    description="Ticket card dummy description test"
                    price="3,99"
                    account='srjpg'
                    expireDate="03/08/2020"
                    color="#69f0ae">
                </Card>
                <Card
                    label="Gym"
                    description="Ticket card dummy description test"
                    price="7,99"
                    account='accountbuyer@hotmail.com'
                    expireDate="03/08/2020"
                    color="white">
                </Card>
                <Card
                    label="Playstation Network"
                    description="Ticket card dummy description test"
                    price="7,99"
                    account='dummyUser78'
                    expireDate="03/08/2020"
                    color="#82b1ff">
                </Card>
                <Card
                    label="Amazon Prime"
                    description="Ticket card dummy description test"
                    price="23,50"
                    account='test@paylist.com'
                    expireDate="03/08/2020"
                    color="#ffe57f">
                </Card>
                <Card
                    label="Water bill"
                    description="Ticket card dummy description test"
                    price="4,59"
                    account='example@paylist.com'
                    expireDate="03/08/2020"
                    color="#b2ebf2">
                </Card>

                <Text>n subscriptions</Text>

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
    headerIconShape:{
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
    }
})