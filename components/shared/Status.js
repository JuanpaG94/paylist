import React from 'react';
import { StatusBar } from 'react-native';

const Status = () => {
    return (
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#ffffff90"
                translucent={true}
            />
    )
}

export { Status };