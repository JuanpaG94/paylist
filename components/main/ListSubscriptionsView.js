import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

// Custom fonts
import { Fonts } from '../../utils/fonts';
// Custom components
import { Status } from '../shared/StatusBar';
import { FloatingActionButton } from '../shared/Buttons';
import { Card } from '../shared/Card';
import { ButtonSheetOptions } from '../shared/ButtonSheet';

export class ListSubscriptionsView extends Component {
    state = {
        currentUser: null,
        currentUserSubsList: [],
        errorMessage: null,
        currentBottomSheetLabel: 'Options'
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            this.handleListSubcriptions(this.state.currentUser.uid);
        });
    }

    componentDidUpdate() {
        this.handleListSubcriptions(this.state.currentUser.uid);
    }

    handleListSubcriptions = (userID) => {
        firebase.firestore().collection('subscriptions').where("userID", "==", userID)
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

    handleOpenBottomSheet = (name) => {
        this.setState({ currentBottomSheetLabel: name })
        this.RBSheet.open();
    }

    render() {
        const { currentUserSubsList } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Subscriptions</Text>
                        <Ionicons style={styles.headerIconShape} name="ios-more" size={26} color="#6200ee" />
                    </View>

                    {currentUserSubsList.map((subscription) =>
                        <Card
                            key={subscription.id}
                            label={subscription.name}
                            description={subscription.desc}
                            price={subscription.price}
                            expireDate={subscription.date ? 'On ' + subscription.date.toDate().getDate() + '/' + (subscription.date.toDate().getMonth() + 1) : ''}
                            account={subscription.account}
                            color={subscription.color ? subscription.color : '#ECEFF1'}
                            onLongPress={() => this.handleOpenBottomSheet(subscription.name)}
                        >
                        </Card>)
                    }

                    {currentUserSubsList.length > 3 ? <Text style={styles.countLabel}>{currentUserSubsList.length} subscriptions</Text> : false}

                </ScrollView>

                {currentUserSubsList.length === 0 ? <Text style={styles.emptyLabel}>Hey, come on! Tap the + to add something!</Text> : false}

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButton onPress={() => this.props.navigation.navigate('CreateSubscription')}></FloatingActionButton>
                </View>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    duration={200}
                    height={200}
                    animationType={"slide"}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            borderColor: '#00000020',
                            borderLeftWidth: 0.7,
                            borderRightWidth: 0.7,
                            borderStyle: 'solid',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderTopWidth: 2,
                        }
                    }}
                >
                    <ButtonSheetOptions label={this.state.currentRBSheetLabel} onClosePress={() => this.RBSheet.close()} />
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