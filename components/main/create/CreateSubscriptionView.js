import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, DatePickerAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom fonts
import { Fonts } from '../../../utils/variables';
// Custom components
import { Status } from '../../shared/StatusBar';
import { Input, InputNumeric, InputDate } from '../../shared/Inputs';
import { ButtonSecondary, FloatingActionButton, FloatingActionButtonCancel } from '../../shared/Buttons';

export default class CreateSubscriptionView extends Component {
    state = {
        currentUser: null,
        name: null,
        desc: null,
        account: null,
        color: null,
        price: null,
        purchaseDate: [],
    }

    showAlert = (message) => {
        Alert.alert(
            'Oops! Something happened',
            message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    openDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date. Month 0 is January.
                date: new Date(),
                mode: "spinner",
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected date when we push accept on datepicker
                var selectedDate = []
                selectedDate.push(year, month, day)
                this.setState({ purchaseDate: selectedDate });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    handleCreate = () => {
        const { currentUser, name, desc, account, color, price, purchaseDate } = this.state

        var docData = {
            userID: currentUser.uid,
            name: name,
            desc: desc,
            price: price,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            purchaseDate: firebase.firestore.Timestamp.fromDate(new Date(purchaseDate[0], purchaseDate[1], purchaseDate[2])),
            account: account,
            color: '#b2ebf2',
        }

        if (docData.name == null || docData.price == null || docData.price == 0 || docData.account == null || docData.purchaseDate == []) {
            console.log('Document empty, showing alert');
            const message = 'Name, service account and purchase date cannot be empty. Price cannot be 0 or empty. Please, fill them!';
            this.showAlert(message);
        } else {
            firebase.firestore().collection("subscriptions")
                .add(docData)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    console.log("With name: ", docData.name);
                    this.props.navigation.goBack();
                })
                .catch(error => {
                    console.error("Error adding document: ", error)
                    this.showAlert(error.message)
                })

        }
    }


    render() {
        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>New subscription</Text>
                        <Ionicons name="ios-albums" size={26} color="#6200ee" />
                    </View>

                    <Input
                        label="What is the subscription name?"
                        placeholder="Netflix, Spotify, Amazon Prime"
                        onChangeText={name => this.setState({ name })}
                        maxLength={20}
                        value={this.state.name}>
                    </Input>
                    <Input
                        label="Description"
                        placeholder="(optional) something about this service"
                        onChangeText={desc => this.setState({ desc })}
                        maxLength={70}
                        value={this.state.desc}>
                    </Input>
                    <InputNumeric
                        label="Price"
                        placeholder="i.e. 3,99"
                        onChangeText={price => this.setState({ price })}
                        value={this.state.price}>
                    </InputNumeric>
                    <Input
                        label="Service account"
                        placeholder="the email you're using on the service"
                        onChangeText={account => this.setState({ account })}
                        maxLength={40}
                        value={this.state.account}>
                    </Input>

                    <InputDate
                        label="Subscription date"
                        placeholder="select a date below"
                        value={this.state.purchaseDate.length === 0 ? "" : this.state.purchaseDate[2] + '/' + (this.state.purchaseDate[1] + 1) + '/' + this.state.purchaseDate[0]}
                    >
                    </InputDate>
                    <ButtonSecondary onPress={this.openDatePicker}>Select date</ButtonSecondary>

                </ScrollView>

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButtonCancel onPress={() => this.props.navigation.goBack()}>CANCEL</FloatingActionButtonCancel>
                    <FloatingActionButton onPress={this.handleCreate}>SAVE</FloatingActionButton>
                </View>
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
        paddingTop: 18,
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
    bottomBarOptions: {
        backgroundColor: '#fefefe',
        borderColor: '#cecece70',
        borderLeftWidth: 0.7,
        borderRightWidth: 0.7,
        borderStyle: 'solid',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5,
        width: '100%',
    },
})