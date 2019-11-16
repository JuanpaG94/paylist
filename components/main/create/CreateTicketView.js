import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, DatePickerAndroid, DatePickerIOS } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-ionicons';
import ColorPalette from 'react-native-color-palette';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RNCamera } from 'react-native-camera';

// Custom fonts
import { Fonts, Colors } from '../../../utils/variables';
// Custom components
import { Status } from '../../shared/Status';
import { Input, InputNumeric, InputDate } from '../../shared/Inputs';
import { ButtonSecondary, FloatingActionButton, FloatingActionButtonCancel } from '../../shared/Buttons';

export default class CreateTicketView extends Component {
    state = {
        currentUser: null,
        shop: null,
        name: null,
        desc: null,
        account: null,
        color: null,
        price: null,
        purchaseDate: [],
        dateiOS: new Date(),
        isCameraOpened: false,
        picture: null,
        pictureUrl: null,
        editModeDataId: this.props.navigation.getParam('ticketId', null),
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

    openDatePickerAndroid = async () => {
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

    openDatePickeriOS = () => {
        this.RBSheet.open()
    }

    setPurchaseDateiOS = (date) => {
        this.setState({ dateiOS: date })
        try {
            var selectedDate = []
            selectedDate.push(date.getFullYear(), (date.getMonth()), date.getDate())
            this.setState({ purchaseDate: selectedDate });
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    cameraTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ picture: data })
            this.setState({ isCameraOpened: false });
            console.log(data)
        }
    };

    uploadCameraPictureToDatabaseThenHandle = () => {
        // Create a root reference
        var storageRef = firebase.storage().ref();
        // Picture name
        var pictureName = this.state.picture.uri.split('/Camera/')[1]
        // Upload picture
        var uploadTask = storageRef.child('tickets/' + pictureName).putFile(this.state.picture.uri)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    case firebase.storage.TaskState.SUCCESS:
                        console.log('Upload is success for', pictureName);
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object");
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload')
                        break;
                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect error.serverResponse')
                        break;
                }
            }, () => {
                // Upload completed successfully, now we can get the download URL
                console.log('pictureName:', pictureName)
                firebase.storage()
                    .ref('tickets/' + pictureName)
                    .getDownloadURL()
                    .then(downloadUrl => {
                        console.log('File available on', downloadUrl);
                        this.setState({ pictureUrl: downloadUrl });
                        this.handleCreateOrEdit()
                    })
                    .catch(error => {
                        console.log('Error ocurred while getting downloadUrl:', error)
                        this.showAlert('Picture cannot be uploaded, please try again later.')
                    })
            });
    }

    handleCreateOrEdit = () => {
        const { currentUser, shop, name, desc, price, purchaseDate, color, pictureUrl, editModeDataId } = this.state

        var docData = {
            userID: currentUser.uid,
            name: name,
            shop: shop,
            desc: desc,
            price: price !== null ? price.replace(/,/g, '.') : price,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            purchaseDate: purchaseDate.length === 0 ? purchaseDate : firebase.firestore.Timestamp.fromDate(new Date(purchaseDate[0], purchaseDate[1], purchaseDate[2])),
            color: color,
            pictureUrl: pictureUrl,
        }

        if (docData.name === (null || '') || docData.shop === (null || '') || docData.price === null || docData.purchaseDate.length === 0) {
            const message = 'Only the description can be optional. Please fill the rest!';
            this.showAlert(message);
        }
        else if (!docData.price.match(/^[0-9]\d*([.,]\d+)?$/g) || Number(docData.price) === 0) {
            const message = 'Price needs to be greater than 0 and a whole number or decimal number';
            this.showAlert(message);
        } else {
            if (editModeDataId === null) { // Creation mode
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
            } else { // Edit mode
                firebase.firestore().collection("tickets").doc(editModeDataId)
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
        firebase.firestore().collection("tickets").doc(dataId)
            .get().then((doc) => {
                if (doc.exists) {
                    const docData = doc.data();
                    this.setState({ name: docData.name });
                    this.setState({ shop: docData.shop });
                    this.setState({ desc: docData.desc });
                    this.setState({ price: docData.price });
                    this.setState({ color: docData.color });
                    this.setState({ pictureUrl: docData.pictureUrl });

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
                        <Text style={styles.headerLabel}>{this.state.editModeDataId !== null ? 'Edit warranty ticket' : 'New warranty ticket'}</Text>
                        <Ionicons name="ios-paper" size={26} color="#6200ee" />
                    </View>

                    <Input
                        label="What did you buy?"
                        placeholder="laptop, smartphone, TV"
                        onChangeText={name => this.setState({ name })}
                        maxLength={20}
                        value={this.state.name}>
                    </Input>
                    <Input
                        label="Where did you buy it?"
                        placeholder="Amazon, Carrefour, MediaMarkt"
                        onChangeText={shop => this.setState({ shop })}
                        maxLength={20}
                        value={this.state.shop}>
                    </Input>
                    <Input
                        label="Description"
                        placeholder="(optional) some info about this purchase"
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

                    <InputDate
                        label="Purchase date"
                        placeholder="select a date below"
                        value={this.state.purchaseDate.length === 0 ? "" : this.state.purchaseDate[2] + '/' + (this.state.purchaseDate[1] + 1) + '/' + this.state.purchaseDate[0]}
                    >
                    </InputDate>
                    <ButtonSecondary onPress={Platform.OS === 'ios' ? this.openDatePickeriOS : this.openDatePickerAndroid}>Select date</ButtonSecondary>

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

                    <Text style={[styles.label, { paddingBottom: 5 }]}>Capture your ticket</Text>
                    <View style={styles.cameraTakenPicturePreviewContainer}>
                        {this.state.picture || this.state.pictureUrl ?
                            <Image
                                source={{ uri: this.state.picture ? this.state.picture.uri : this.state.pictureUrl }}
                                style={[styles.cameraTakenPicturePreview, { height: 200, width: 200 }]}
                            /> : <View style={styles.cameraNoPicturePreview}><Ionicons name="ios-camera" size={38} color={Colors.TextDark} /><Text>No picture taken</Text></View>}
                    </View>
                    <ButtonSecondary onPress={() => this.setState({ isCameraOpened: true })}>{this.state.picture || this.state.pictureUrl ? 'Repeat picture' : 'Take picture'}</ButtonSecondary>

                </ScrollView>

                <View style={styles.bottomBarOptions}>
                    <FloatingActionButtonCancel onPress={() => this.props.navigation.goBack()}>CANCEL</FloatingActionButtonCancel>
                    <FloatingActionButton onPress={this.state.picture ? this.uploadCameraPictureToDatabaseThenHandle : this.handleCreateOrEdit}>SAVE</FloatingActionButton>
                </View>


                {/* --- DATEPICKER UI --- */}
                {Platform.OS === 'ios' ? <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    duration={200}
                    height={330}
                    animationType={"fade"}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                >
                    <DatePickerIOS
                        date={this.state.dateiOS}
                        onDateChange={(date) => this.setPurchaseDateiOS(date)}
                        mode={"date"}
                    />
                    <View style={[{ paddingLeft: 20 }, { paddingRight: 20 }]}>
                        <ButtonSecondary onPress={() => this.RBSheet.close()}>OK</ButtonSecondary>
                    </View>
                </RBSheet> : false}


                {/* --- CAMERA UI --- */}
                {this.state.isCameraOpened === true ? <View style={styles.cameraContainer}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.cameraPreview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'Camera will only be used to capture your ticket',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'Audio will not be used for anything, this is just a required permission.',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    />
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.cameraTakePicture.bind(this)} style={styles.cameraCapture}>
                            <Ionicons name="ios-radio-button-on" size={74} color={Colors.WrappersBoxColor} />
                        </TouchableOpacity>
                    </View>
                </View> : false}
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
    label: {
        color: Colors.TextDark,
        fontFamily: Fonts.InterBold,
        fontSize: 16,
        width: '100%',
        paddingTop: 10,
        marginBottom: -8,
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
        padding: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        width: '100%',
    },
    cameraContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    cameraPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cameraCapture: {
        alignSelf: 'center',
        margin: 10,
        marginBottom: 20,
    },
    cameraTakenPicturePreviewContainer: {
        alignItems: "center",
        backgroundColor: Colors.WrappersBoxColor,
        borderColor: Colors.WrappersBorderColor,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1.5,
        flex: 1,
        marginTop: 9,
        padding: 15,
        width: '100%',
    },
    cameraNoPicturePreview: {
        flex: 1,
        alignItems: 'center',
    },
    cameraTakenPicturePreview: {
        borderRadius: 4,
    }
})