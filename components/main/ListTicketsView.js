import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageViewer from 'react-native-image-zoom-viewer';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import { Status } from '../shared/Status';
import { FloatingActionButton } from '../shared/Buttons';
import { CardTicket } from '../shared/Card';
import { ButtonSheetOptions, ButtonSheetMainSettings } from '../shared/ButtonSheet';

export class ListTicketsView extends Component {
    state = {
        currentUser: null,
        currentUserTicketsList: [],
        currentBottomSheetLabel: 'Options',
        currentBottomSheetId: null,
        orderBy: 'name',
        modalVisible: false,
        currentPictureUrl: null,
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            if (this.state.currentUser !== null) {
                this.handleListTickets(this.state.currentUser.uid);
            }
        });
    }

    componentDidUpdate() {
        if (this.state.currentUser !== null) {
            this.handleListTickets(this.state.currentUser.uid);
        }
    }

    handleLogout = () => {
        this.RBSheetMainSettings.close();

        firebase.auth().signOut()
            .then(() => {
                this.setState({ currentUser: null });
                this.props.navigation.navigate('Loading');
            })
            .catch(error => console.log(error))
    }

    componentWillUnmount() {
        console.log('User disconnected, component unmounted')
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

    handleOpenMainSettingsBottomSheet = () => {
        this.RBSheetMainSettings.open();
    }

    handleOrderBy = (value) => {
        this.RBSheetMainSettings.close();
        this.setState({ orderBy: value })
    }

    handleViewPicture = (picture) => {
        if (picture) {
            this.setState({ modalVisible: true })
            this.setState({ currentPictureUrl: picture })
        } else {
            this.setState({ modalVisible: false })
            console.log('Closing modal')
        }
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
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    {Platform.OS === 'ios' ? false : <Status></Status>}

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Warranty Tickets</Text>
                        <Ionicons name="ios-settings" size={26} color={Colors.TextDark} onPress={() => this.handleOpenMainSettingsBottomSheet()} />
                    </View>

                    {currentUserTicketsList.map((ticket) => <CardTicket
                        key={ticket.id}
                        color={ticket.color}
                        labelShop={ticket.shop}
                        label={ticket.name}
                        description={ticket.desc}
                        price={ticket.price}
                        pictureUrl={ticket.pictureUrl}
                        purchaseDate={ticket.purchaseDate ? ticket.purchaseDate.toDate().getDate() + '/' + (ticket.purchaseDate.toDate().getMonth() + 1) + '/' + (ticket.purchaseDate.toDate().getFullYear()) : ''}
                        expireDate={ticket.purchaseDate ? ticket.purchaseDate.toDate().getDate() + '/' + (ticket.purchaseDate.toDate().getMonth() + 1) + '/' + (ticket.purchaseDate.toDate().getFullYear() + 2) : ''}
                        onLongPress={() => this.handleOpenBottomSheet(ticket.name, ticket.id)}
                        onPress={ticket.pictureUrl ? () => this.handleViewPicture(ticket.pictureUrl) : null}
                    >
                    </CardTicket>)}

                    {currentUserTicketsList.length > 3
                        ? <Text style={styles.countLabel}>{currentUserTicketsList.length} tickets</Text>
                        : false}
                    {currentUserTicketsList.length !== 0
                        ? <Text style={styles.warrantyLabel}>All products enjoy a 2-year warranty in the European Union, as well as 14 days for their return</Text>
                        : false}

                </ScrollView>

                {currentUserTicketsList.length === 0
                    ? <Text style={styles.emptyLabel}>Tap on + to add tickets</Text>
                    : false}

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButton onPress={() => this.props.navigation.navigate('CreateTicket')}></FloatingActionButton>
                </View>

                {/* --- EDIT OPTIONS BOTTOM SHEET --- */}
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    duration={200}
                    height={Platform.OS === 'ios' ? 240 : 200}
                    animationType={"fade"}
                    customStyles={{
                        container: {
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

                {/* --- MAIN SETTINGS BOTTOM SHEET --- */}
                <RBSheet
                    ref={ref => {
                        this.RBSheetMainSettings = ref;
                    }}
                    closeOnDragDown={true}
                    duration={200}
                    height={Platform.OS === 'ios' ? 340 : 300}
                    animationType={"fade"}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                >
                    <ButtonSheetMainSettings
                        onOrderBy1Press={() => this.handleOrderBy('name')}
                        onOrderBy2Press={() => this.handleOrderBy('purchaseDate')}
                        account={this.state.currentUser ? this.state.currentUser.email : 'Account'}
                        onLogoutPress={() => this.handleLogout()}
                    />
                </RBSheet>

                {/* --- MODAL IMAGE VIEWER --- */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle={"fullScreen"}
                    onRequestClose={() => {
                        console.log('Modal closed.');
                    }}>
                    <ImageViewer
                        backgroundColor={Colors.WrappersBorderColor}
                        enableSwipeDown={true}
                        onSwipeDown={() => this.handleViewPicture()}
                        saveToLocalByLongPress={false}
                        renderIndicator={() => <Text></Text>}
                        footerContainerStyle={{ width: '100%' }}
                        renderFooter={() =>
                            <View style={styles.imageViewerRenderFooter}>
                                <Text style={styles.imageViewerRenderFooterText}>Swipe down to close</Text>
                                <Ionicons name="ios-arrow-down" size={26} color={Colors.TextDark} />
                            </View>
                        }
                        imageUrls={[{ url: this.state.currentPictureUrl }]} />
                </Modal>
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
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
        width: '100%',
    },
    headerLabel: {
        color: '#263238',
        fontFamily: Fonts.InterBlack,
        fontSize: 22,
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
        color: 'gray',
        fontFamily: Fonts.InterRegular,
        paddingTop: 20,
    },
    warrantyLabel: {
        color: 'gray',
        fontFamily: Fonts.InterRegular,
        justifyContent: "center",
        textAlign: 'center',
        paddingBottom: 65,
        paddingTop: 20,
    },
    bottomBarOptions: {
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
        width: '100%',
    },
    imageViewerRenderFooter: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: Platform.OS === 'ios' ? 45 : 35,
    },
    imageViewerRenderFooterText: {
        color: Colors.CardColor12,
        fontFamily: Fonts.InterSemiBold,
        fontSize: 14,
        padding: 3,
        opacity: 0.7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: Colors.TextDark,
    },
})