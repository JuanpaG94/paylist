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
                <Text>
                    Your UID is {currentUser && currentUser.uid}
                </Text>

                <Button onPress={this.handleLogout}>Logout</Button>
            </View>
        )
    }
}

class ListSubscriptionsView extends Component {
    state = {
        currentUser: null,
        currentUserSubsList: [],
        errorMessage: null
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            console.log('USER ID', this.state.currentUser.uid);
        });

        this.handleListSubcriptions();
    }

    handleListSubcriptions = () => {
        firebase.firestore().collection('subscriptions')
            .get()
            .then(querySnapshot => {
                const userSubsArray = []
                querySnapshot.forEach(doc => {
                    userSubsArray.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                this.setState({ currentUserSubsList: userSubsArray });
            })
    }



    render() {
        const { currentUserSubsList } = this.state

        console.log('subscriptionsList', currentUserSubsList)

        return (
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <Status></Status>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerLabel}>Subscriptions</Text>
                    <Ionicons style={styles.headerIconShape} name="ios-cog" size={26} color="black" />
                </View>

                {currentUserSubsList.map((subscription) => <Card
                    key={subscription.id}
                    label={subscription.name}
                    description={subscription.desc}
                    price={subscription.price}
                    expireDate="03/08/2020"
                    account={subscription.account}
                    color="#ff80ab">
                </Card>)}

                <Text>{currentUserSubsList.length} subscriptions</Text>

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
    }
})