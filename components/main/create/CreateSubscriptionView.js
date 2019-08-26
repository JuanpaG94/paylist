import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, DatePickerAndroid, Picker } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';
import ColorPalette from 'react-native-color-palette';

// Custom fonts
import { Fonts, Colors } from '../../../utils/variables';
// Custom components
import { Status } from '../../shared/Status';
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
        type: 'month',
        purchaseDate: [],
        editModeDataId: this.props.navigation.getParam('subscriptionId', null),
    }

    showAlert = (message) => {
        Alert.alert(
            'Oops!',
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

        if (this.state.editModeDataId !== null) {
            this.handleLoadEditMode(this.state.editModeDataId);
        }
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

    handleCreateOrEdit = () => {
        const { currentUser, name, desc, account, color, price, type, purchaseDate, editModeDataId } = this.state

        var docData = {
            userID: currentUser.uid,
            name: name,
            desc: desc,
            price: price.replace(/,/g, '.'),
            type: type ? type : 'month',
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            purchaseDate: purchaseDate.length === 0 ? purchaseDate : firebase.firestore.Timestamp.fromDate(new Date(purchaseDate[0], purchaseDate[1], purchaseDate[2])),
            account: account,
            color: color,
        }

        if (docData.name == null || docData.account == null || docData.purchaseDate.length === 0) {
            const message = 'Name, service account and purchase date cannot be empty. Please, fill them!';
            this.showAlert(message);
        }
        else if (!docData.price.match(/^[0-9]\d*([.,]\d+)?$/g)) {
            const message = 'Price needs to be greater than 0 and be a whole number or decimal number with comma';
            this.showAlert(message);
        } else {
            if (editModeDataId === null) { // Creation mode
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
            } else { // Edit mode
                firebase.firestore().collection("subscriptions").doc(editModeDataId)
                    .update(docData)
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.props.navigation.goBack();
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
            }
        }
    }

    handleLoadEditMode = (dataId) => { // Fill the form
        firebase.firestore().collection("subscriptions").doc(dataId)
            .get().then((doc) => {
                if (doc.exists) {
                    const docData = doc.data();
                    this.setState({ name: docData.name });
                    this.setState({ desc: docData.desc });
                    this.setState({ price: docData.price });
                    this.setState({ account: docData.account });
                    this.setState({ color: docData.color })
                    this.setState({ type: docData.type })

                    const docDataPurchase = []
                    docDataPurchase.push(
                        docData.purchaseDate.toDate().getFullYear(),
                        docData.purchaseDate.toDate().getMonth(),
                        docData.purchaseDate.toDate().getDate()
                    )
                    this.setState({ purchaseDate: docDataPurchase });
                } else {
                    console.log("No such document");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

    render() {
        return (
            <View style={[{ 'height': '100%' }]}>
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <Status></Status>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerLabel}>{this.state.editModeDataId !== null ? 'Edit subscription' : 'New subscription'}</Text>
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
                    <Picker
                        selectedValue={this.state.type}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            this.setState({ type: itemValue })
                        }>
                        <Picker.Item label="per month" value="month" />
                        <Picker.Item label="per year" value="year" />
                    </Picker>
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

                    <Text style={styles.label}>Choose a card color</Text>
                    <ColorPalette
                        onChange={color => this.setState({ color: color })}
                        defaultColor={Colors.CardColor12}
                        value={this.state.color}
                        colors={[Colors.CardColor1, Colors.CardColor2, Colors.CardColor3, Colors.CardColor4, Colors.CardColor5, Colors.CardColor6,
                        Colors.CardColor7, Colors.CardColor8, Colors.CardColor9, Colors.CardColor10, Colors.CardColor11, Colors.CardColor12]}
                        title={''}
                        paletteStyles={{
                            backgroundColor: Colors.WrappersBoxColor,
                            borderColor: Colors.WrappersBorderColor,
                            borderRadius: 10,
                            borderStyle: 'solid',
                            borderWidth: 1.5,
                            marginBottom: 10,
                            marginTop: 0,
                            padding: 0
                        }}
                        icon={
                            <Ionicons name="checkmark" size={20} color={Colors.TextDark} />
                        }
                    />

                </ScrollView>

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButtonCancel onPress={() => this.props.navigation.goBack()}>CANCEL</FloatingActionButtonCancel>
                    <FloatingActionButton onPress={this.handleCreateOrEdit}>SAVE</FloatingActionButton>
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
    label: {
        color: Colors.TextDark,
        fontFamily: Fonts.InterBold,
        fontSize: 16,
        width: '100%',
        paddingTop: 10,
        marginBottom: -12,
    },
    picker: {
        height: 50,
        width: 150,
        position: 'absolute',
        top: 316,
        right: 25,
    },
    bottomBarOptions: {
        backgroundColor: Colors.WrappersBoxColor,
        borderColor: Colors.WrappersBorderColor,
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