import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';

// Custom fonts
import { Fonts } from '../../utils/fonts';
// Custom components
import { Status } from '../shared/StatusBar';
import { FloatingActionButton } from '../shared/Buttons';
import { CardTicket } from '../shared/Card';

export class ListTicketsView extends Component {
    state = {
        currentUser: null,
        currentUserTicketsList: [],
        errorMessage: null
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            this.handleListTickets(this.state.currentUser.uid);
        });
    }

    componentDidUpdate() {
        this.handleListTickets(this.state.currentUser.uid);
    }

    handleListTickets = (userID) => {
        firebase.firestore().collection('tickets').where("userID", "==", userID)
            .get()
            .then(querySnapshot => {
                const userSubsArray = []
                querySnapshot.forEach(doc => {
                    userSubsArray.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                this.setState({ currentUserTicketsList: userSubsArray });
            })
    }

    render() {
        const { currentUserTicketsList } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Tickets</Text>
                        <Ionicons style={styles.headerIconShape} name="ios-more" size={26} color="#6200ee" />
                    </View>

                    {currentUserTicketsList.map((ticket) => <CardTicket
                        key={ticket.id}
                        label={ticket.name}
                        description={ticket.desc}
                        price={ticket.price}
                        purchaseDate={ticket.purchaseDate ? ticket.purchaseDate.toDate().getDate() + '/' + (ticket.purchaseDate.toDate().getMonth() + 1) + '/' + (ticket.purchaseDate.toDate().getFullYear()) : ''}
                        expireDate={ticket.expireDate ? ticket.expireDate.toDate().getDate() + '/' + (ticket.expireDate.toDate().getMonth() + 1) + '/' + (ticket.expireDate.toDate().getFullYear()) : ''}
                    >
                    </CardTicket>)}

                    {currentUserTicketsList.length > 3 ? <Text style={styles.countLabel}>{currentUserTicketsList.length} tickets</Text> : false}

                </ScrollView>

                {currentUserTicketsList.length === 0 ? <Text style={styles.emptyLabel}>Hey, come on! Tap on + to add something!</Text> : false}

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButton onPress={() => this.props.navigation.navigate('CreateTicket')}></FloatingActionButton>
                </View>
            </View>
        )
    }
}

export default createStackNavigator(
    {
        Tickets: {
            screen: ListTicketsView, navigationOptions: {
                header: null,
            }
        },
    },
    {
        initialRouteName: "Tickets"
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
    cardsContainer: {
        alignItems: 'center',
        padding: 20,
    },
    emptyLabel: {
        alignSelf: 'center',
        flex: 1,
        fontFamily: Fonts.InterExtraBold,
        justifyContent: 'center',
        textAlign: 'center',
        width: '80%',
    },
    countLabel: {
        fontFamily: Fonts.InterRegular,
    },
    bottomBarOptions: {
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
        width: '100%',
    },
})