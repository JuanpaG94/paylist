import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-ionicons';

// Views for bottom tab navigator
import ListTicketsView from './main/ListTicketsView';
import ListSubscriptionsView from './main/ListSubscriptionsView';
import CreateSubscriptionView from './main/create/CreateSubscriptionView';
import CreateTicketView from './main/create/CreateTicketView';
import SettingsView from './main/SettingsView';
// Custom imports
import { Colors } from '../utils/variables';

const BottomTabNavigator = createBottomTabNavigator(
    {
        Subscriptions: ListSubscriptionsView,
        Tickets: ListTicketsView,
        Settings: SettingsView,
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
                } else if (routeName === 'Settings') {
                    iconName = `ios-information-circle`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: Colors.PrimaryDarker,
            inactiveTintColor: Colors.inactiveColor,
            style: {
                backgroundColor: Colors.WrappersBoxColor,
                borderTopColor: Colors.WrappersBorderColor,
                borderStyle: 'solid',
                borderTopWidth: 1.2,
            }
        },
    }
);

export default createStackNavigator(
    {
        Main: BottomTabNavigator,
        CreateSubscription: {
            screen: CreateSubscriptionView, navigationOptions: {
                tabBarVisible: false
            }
        },
        CreateTicket: {
            screen: CreateTicketView, navigationOptions: {
                tabBarVisible: false
            }
        },
    },
    {
        headerMode: 'none',
    }
)