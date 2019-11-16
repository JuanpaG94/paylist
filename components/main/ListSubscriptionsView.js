import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Picker } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import { Status } from '../shared/Status';
import { FloatingActionButton } from '../shared/Buttons';
import { Card } from '../shared/Card';
import { ButtonSheetOptions } from '../shared/ButtonSheet';

export class ListSubscriptionsView extends Component {
    state = {
        isLoading: true,
        currentUser: null,
        currentUserSubsList: [],
        currentBottomSheetLabel: 'Options',
        currentBottomSheetId: null,
        orderBy: 'name',
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            if (this.state.currentUser !== null) {
                this.handleListSubcriptions(this.state.currentUser.uid);
            }
        });

        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1000);
    }

    componentDidUpdate() {
        if (this.state.currentUser !== null) {
            this.handleListSubcriptions(this.state.currentUser.uid); // Updating list when added something from create view
        }
    }

    componentWillUnmount() {
        this.setState({ currentUser: null });
    }

    handleListSubcriptions = (userID) => {
        firebase.firestore()
            .collection('subscriptions')
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
                this.setState({ currentUserSubsList: userSubsArray });
            })
            .catch(error => console.log(error))
    }

    handleOpenBottomSheet = (subscriptionName, subscriptionId) => {
        this.setState({ currentBottomSheetLabel: subscriptionName });
        this.setState({ currentBottomSheetId: subscriptionId });
        this.RBSheet.open();
    }

    handleEditSubscription = (subscriptionId) => {
        this.RBSheet.close();
        this.props.navigation.navigate('CreateSubscription', {
            subscriptionId: subscriptionId,
        });
    }

    handleDeleteSubscription = (subscriptionId) => {
        firebase.firestore().collection('subscriptions').doc(subscriptionId).delete()
            .then(() => { this.RBSheet.close(); this.handleListSubcriptions(this.state.currentUser.uid) }) // Updating list when delete
            .catch(error => console.log('[handleDelete] Error deleting with message:', error))
        console.log('[handleDelete] Successfully deleted sub with id ' + subscriptionId)
    }

    render() {
        const { currentUserSubsList } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    {Platform.OS === 'ios' ? false : <Status></Status>}

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Subscriptions</Text>
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

                    {currentUserSubsList.map((subscription) =>
                        <Card
                            key={subscription.id}
                            label={subscription.name}
                            description={subscription.desc}
                            price={subscription.price}
                            type={subscription.type}
                            purchaseDate={subscription.purchaseDate ? 'Started on ' + subscription.purchaseDate.toDate().getDate() + '/' + (subscription.purchaseDate.toDate().getMonth() + 1) + '/' + (subscription.purchaseDate.toDate().getFullYear()) : ''}
                            /*expireDate={subscription.purchaseDate ?
                                'On ' + subscription.purchaseDate.toDate().getDate()
                                + '/'
                                + (new Date().getMonth() === 11 // is december?
                                    ? subscription.type === 'month'
                                        ? '1' // so january
                                        : '12' // if not monthly, still december
                                    : subscription.type === 'month' // if not december
                                        ? (new Date().getMonth() + 2) // +1 if monthly
                                        : (new Date().getMonth() + 1) // same month if not
                                )
                                + '/'
                                + (subscription.purchaseDate.toDate().getFullYear()) : ''}*/
                            account={subscription.account}
                            color={subscription.color}
                            onLongPress={() => this.handleOpenBottomSheet(subscription.name, subscription.id)}
                        >
                        </Card>)
                    }

                    {currentUserSubsList.length > 3 ? <Text style={styles.countLabel}>{currentUserSubsList.length} subscriptions</Text> : false}

                </ScrollView>

                {this.state.isLoading === true ? <ActivityIndicator style={styles.activityIndicator} size="large" /> : false}
                {this.state.isLoading === false && currentUserSubsList.length === 0 ? <Text style={styles.emptyLabel}>Tap on + to add subscriptions</Text> : false}

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButton onPress={() => this.props.navigation.navigate('CreateSubscription')}></FloatingActionButton>
                </View>

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
                        onEditPress={() => this.handleEditSubscription(this.state.currentBottomSheetId)}
                        onDeletePress={() => this.handleDeleteSubscription(this.state.currentBottomSheetId)}
                    />
                </RBSheet>
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
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
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
    activityIndicator: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
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
        paddingBottom: 65,
        paddingTop: 10,
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