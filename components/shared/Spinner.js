import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        opacity: 0.7,
    }
})

export { Spinner };