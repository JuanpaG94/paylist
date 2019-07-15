import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';

// Views for bottom tab navigator
import ListTicketsView from './main/ListTicketsView';
import ListSubscriptionsView from './main/ListSubscriptionsView';

export default createBottomTabNavigator(
    {
        Subscriptions: ListSubscriptionsView,
        Tickets: ListTicketsView,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Subscriptions') {
                    iconName = `ios-albums`; // ${focused ? '' : '-outline'}` puede ser util en el futuro
                } else if (routeName === 'Tickets') {
                    iconName = `ios-paper`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#6200ee',
            inactiveTintColor: 'gray',
        },
    }
);