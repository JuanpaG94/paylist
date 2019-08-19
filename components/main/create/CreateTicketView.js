import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';

// Custom fonts
import { Fonts } from '../../../utils/variables';
// Custom components
import { Status } from '../../shared/StatusBar';
import { Input, InputNumeric } from '../../shared/Inputs';
import { FloatingActionButton, FloatingActionButtonCancel } from '../../shared/Buttons';

export default class CreateTicketView extends Component {
    state = {
        currentUser: null,
        name: null,
        desc: null,
        account: null,
        color: null,
        price: null,
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

    handleCreate = () => {
        const { currentUser, name, desc, price } = this.state

        var docData = {
            userID: currentUser.uid,
            name: name,
            desc: desc,
            price: price,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
        }

        if (docData.name == null || docData.price == null || docData.desc == null) {
            console.log('Document empty, showing alert');
            const message = 'Name, description and price of the ticket cannot be empty. Please fill them!';
            this.showAlert(message);
        } else {
            firebase.firestore().collection("tickets")
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
                        <Text style={styles.headerLabel}>New ticket</Text>
                        <Ionicons name="ios-paper" size={26} color="#6200ee" />
                    </View>

                    <Input
                        label="What is the bill name?"
                        placeholder="My Phone, Gym, TV purchase"
                        onChangeText={name => this.setState({ name })}
                        maxLength={20}
                        value={this.state.name}>
                    </Input>
                    <Input
                        label="Description"
                        placeholder="(optional) something about this ticket"
                        onChangeText={desc => this.setState({ desc })}
                        maxLength={70}
                        value={this.state.desc}>
                    </Input>
                    <InputNumeric
                        label="Price"
                        placeholder="i.e. 288,90"
                        onChangeText={price => this.setState({ price })}
                        value={this.state.price}>
                    </InputNumeric>

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