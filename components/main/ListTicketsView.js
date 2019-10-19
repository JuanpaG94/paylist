import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Picker, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import { Status } from '../shared/Status';
import { FloatingActionButton } from '../shared/Buttons';
import { CardTicket } from '../shared/Card';
import { ButtonSheetOptions } from '../shared/ButtonSheet';

export class ListTicketsView extends Component {
    state = {
        isLoading: true,
        currentUser: null,
        currentUserTicketsList: [],
        currentBottomSheetLabel: 'Options',
        currentBottomSheetId: null,
        orderBy: 'name',
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            if (this.state.currentUser !== null) {
                this.handleListTickets(this.state.currentUser.uid);
            }
        });

        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1200);
    }

    componentDidUpdate() {
        if (this.state.currentUser !== null) {
            this.handleListTickets(this.state.currentUser.uid);
        }
    }

    componentWillUnmount() {
        this.setState({ currentUser: null });
        //this.setState({ currentUserTicketsList: [] });
    }

    handleListTickets = (userID) => {
        firebase.firestore()
            .collection('tickets')
            .where("userID", "==", userID)
            .orderBy(this.state.orderBy)
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

    handleOpenBottomSheet = (ticketName, ticketId) => {
        this.setState({ currentBottomSheetLabel: ticketName });
        this.setState({ currentBottomSheetId: ticketId });
        this.RBSheet.open();
    }

    handleEditTicket = (ticketId) => {
        this.RBSheet.close();
        this.props.navigation.navigate('CreateTicket', {
            ticketId: ticketId,
        });
    }

    handleDeleteTicket = (ticketId) => {
        firebase.firestore().collection('tickets').doc(ticketId).delete()
            .then(() => { this.RBSheet.close(); this.handleListTickets(this.state.currentUser.uid) }) // Updating list when delete
            .catch(error => console.log('[handleDelete] Error deleting with message:', error))
        console.log('[handleDelete] Successfully deleted sub with id ' + ticketId)
    }

    render() {
        const { currentUserTicketsList } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
                <Image style={{ width: 400, height: 360, position: 'absolute', bottom: -20, opacity: 0.1 }} source={require('../../assets/img/bg-cards.png')} />

                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Warranty Tickets</Text>
                        <Ionicons style={styles.headerIconShape} name="arrow-dropdown-circle" size={26} color='transparent' />
                        <Picker
                            selectedValue={this.state.orderBy}
                            style={styles.picker}
                            onValueChange={(itemValue) =>
                                this.setState({ orderBy: itemValue })
                            }>
                            <Picker.Item label="sort by name" value="name" />
                            <Picker.Item label="sort by date" value="purchaseDate" />
                        </Picker>
                    </View>

                    {currentUserTicketsList.map((ticket) => <CardTicket
                        key={ticket.id}
                        labelShop={ticket.shop}
                        label={ticket.name}
                        description={ticket.desc}
                        price={ticket.price}
                        purchaseDate={ticket.purchaseDate ? ticket.purchaseDate.toDate().getDate() + '/' + (ticket.purchaseDate.toDate().getMonth() + 1) + '/' + (ticket.purchaseDate.toDate().getFullYear()) : ''}
                        expireDate={ticket.purchaseDate ? ticket.purchaseDate.toDate().getDate() + '/' + (ticket.purchaseDate.toDate().getMonth() + 1) + '/' + (ticket.purchaseDate.toDate().getFullYear() + 2) : ''}
                        onLongPress={() => this.handleOpenBottomSheet(ticket.name, ticket.id)}
                    >
                    </CardTicket>)}

                    {this.state.isLoading === false && currentUserTicketsList.length > 3
                        ? <Text style={styles.countLabel}>{currentUserTicketsList.length} tickets</Text>
                        : false}
                    {this.state.isLoading === false && currentUserTicketsList.length !== 0
                        ? <Text style={styles.warrantyLabel}>All products enjoy a 2-year warranty in the European Union, as well as 14 days for their return</Text>
                        : false}

                </ScrollView>

                {this.state.isLoading === true
                    ? <ActivityIndicator style={styles.activityIndicator} size="large" />
                    : false}
                {this.state.isLoading === false && currentUserTicketsList.length === 0
                    ? <Text style={styles.emptyLabel}>Hey! tap on + to add something</Text>
                    : false}

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButton onPress={() => this.props.navigation.navigate('CreateTicket')}></FloatingActionButton>
                </View>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    duration={200}
                    height={200}
                    animationType={"fade"}
                    customStyles={{
                        container: {
                            backgroundColor: Colors.WrappersBoxColor,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                >
                    <ButtonSheetOptions
                        label={this.state.currentBottomSheetLabel}
                        onEditPress={() => this.handleEditTicket(this.state.currentBottomSheetId)}
                        onDeletePress={() => this.handleDeleteTicket(this.state.currentBottomSheetId)}
                    />
                </RBSheet>
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
    picker: {
        height: 50,
        width: 50,
        position: 'absolute',
        top: 9,
        right: -8.55,
        zIndex: 1,
    },
    headerLabel: {
        color: '#263238',
        fontFamily: Fonts.InterBlack,
        fontSize: 22,
    },
    headerIconShape: {
        backgroundColor: Colors.WrappersBorderColor,
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
    activityIndicator: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    countLabel: {
        fontFamily: Fonts.InterRegular,
    },
    warrantyLabel: {
        fontFamily: Fonts.InterRegular,
        justifyContent: "center",
        textAlign: 'center',
        paddingBottom: 65,
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