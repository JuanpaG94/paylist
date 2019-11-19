import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

// Custom fonts
import { Fonts, Colors } from '../../utils/variables';
// Custom components
import { Status } from '../shared/Status';
import { CardTimeline } from '../shared/Card';
import { ButtonSheetMainSettings } from '../shared/ButtonSheet';
// Global variables
var savedYear = null;

export default class TimelineView extends Component {
    state = {
        currentUser: null,
        currentUserContentList: [],
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser }, () => {
            if (this.state.currentUser !== null) {
                this.handleTimeline(this.state.currentUser.uid);
            }
        });
    }

    componentDidUpdate() {
        if (this.state.currentUser !== null) {
            this.handleTimeline(this.state.currentUser.uid);
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

    handleTimeline = (userID) => {
        var list = []
        firebase.firestore()
            .collection('tickets')
            .where("userID", "==", userID)
            .orderBy('purchaseDate')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                firebase.firestore()
                    .collection('subscriptions')
                    .where("userID", "==", userID)
                    .orderBy('purchaseDate')
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            list.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        })
                        var orderedList = list.sort(function (a, b) {
                            return new Date(b.purchaseDate.toDate()) - new Date(a.purchaseDate.toDate());
                        })
                        console.log('ordered list:', orderedList)
                        this.setState({ currentUserContentList: orderedList });
                    })
            })
    }

    handleOpenGeneralSettingsBottomSheet = () => {
        this.RBSheetMainSettings.open();
    }

    savedYear = (year) => {
        var result = ''
        year === savedYear
            ? result = ''
            : result = year
        savedYear = year
        return result
    }

    render() {
        const { currentUserContentList } = this.state

        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    {Platform.OS === 'ios' ? false : <Status></Status>}

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>Timeline</Text>
                        <Ionicons name="ios-settings" size={26} color={Colors.TextDark} onPress={() => this.handleOpenGeneralSettingsBottomSheet()} />
                    </View>

                    {currentUserContentList.map((item) => <CardTimeline
                        key={item.id}
                        color={item.color}
                        label={item.name}
                        labelShop={item.shop}
                        price={item.price}
                        purchaseDate={item.purchaseDate ? (item.purchaseDate.toDate().getDate() + '/' + (item.purchaseDate.toDate().getMonth() + 1)) : ''}
                        purchaseYear={this.savedYear((item.purchaseDate.toDate().getFullYear()))}
                    >
                    </CardTimeline>)}

                    {currentUserContentList.length > 3
                        ? <Text style={styles.countLabel}>{currentUserContentList.length} entries</Text>
                        : false}
                    {currentUserContentList.length !== 0
                        ? <Text style={styles.infoLabel}>Timeline represents all your data ordered by the newest to the oldest start/purchase date</Text>
                        : false}

                </ScrollView>

                {currentUserContentList.length === 0
                    ? <Text style={styles.emptyLabel}>Add subscriptions or tickets to see the timeline!</Text>
                    : false}

                <RBSheet
                    ref={ref => {
                        this.RBSheetMainSettings = ref;
                    }}
                    closeOnDragDown={true}
                    duration={200}
                    height={Platform.OS === 'ios' ? 190 : 150}
                    animationType={"fade"}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                >
                    <ButtonSheetMainSettings
                        account={this.state.currentUser ? this.state.currentUser.email : 'Account'}
                        onLogoutPress={() => this.handleLogout()}
                    />
                </RBSheet>
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
    infoLabel: {
        color: 'gray',
        fontFamily: Fonts.InterRegular,
        justifyContent: "center",
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 20,
    },
})