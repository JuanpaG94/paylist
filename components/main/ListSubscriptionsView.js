import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';

// Custom components
import { Status } from '../shared/StatusBar';
import { Button, FloatingActionButton } from '../shared/Buttons';
import { Card } from '../shared/Card';

// Views for stack navigator
import CreateSubscriptionView from '../main/create/CreateSubscriptionsView';

export class ListSubscriptionsView extends Component {
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

    handleAdd = () => {
        console.log('hey! you pressed the fab ;)')
    }

    render() {
        const { currentUserSubsList } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
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
                        expireDate={subscription.date ? 'On ' + subscription.date.toDate().getDate() + '/' + (subscription.date.toDate().getMonth() + 1) : ''}
                        account={subscription.account}
                        color={subscription.color ? subscription.color : '#ECEFF1'}>
                    </Card>)}

                    <Text>{currentUserSubsList.length} subscriptions</Text>

                </ScrollView>

                <FloatingActionButton onPress={() => this.props.navigation.navigate('Create')}>NEW</FloatingActionButton>
            </View>
        )
    }
}

export default createStackNavigator(
    {
        Subscriptions: {
            screen: ListSubscriptionsView, navigationOptions: {
                header: null,
            }
        },
        Create: { 
            screen: CreateSubscriptionView, navigationOptions: { 
                tabBarVisible: false } 
            },
    },
    {
        initialRouteName: "Subscriptions"
    },
    {
        headerMode: 'none',
        mode: 'modal',
        defaultNavigationOptions: {

        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

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
    }
})