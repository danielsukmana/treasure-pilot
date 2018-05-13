// @flow

import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {Achievement, Compass, QAScene, Scanner} from '../scenes';
import getIconPre from '../helpers/getIconPre';
import {LIGHT_BLUE, GREY, WHITE} from '../general/colors';

const TreasureStackNav = createStackNavigator(
  {
    Treasure: {
      screen: Compass,
    },
    Achievement: {
      screen: Achievement,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'Treasure',
  },
);

const TaskStackNav = createStackNavigator(
  {
    QRCodeReader: {
      screen: Scanner,
    },
    QACard: {
      screen: QAScene,
    },
    //NOTE: I need to add the Treasure route here for carrying the data
    //TODO: Need a better way to reset the routes and navigate to Achievement with params
    Achievement: {
      screen: Achievement,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'QRCodeReader',
  },
);

export const Tabs = createBottomTabNavigator(
  {
    Tab1: {
      screen: TreasureStackNav,
      navigationOptions: {
        tabBarLabel: 'Compass',
        tabBarIcon: ({tintColor}: Object, focused: boolean) => (
          <Ionicons
            name={`${getIconPre()}-compass`}
            size={20}
            color={focused ? WHITE : tintColor}
          />
        ),
      },
    },
    Tab2: {
      screen: TaskStackNav,
      navigationOptions: () => ({
        tabBarLabel: 'Scanner',
        tabBarIcon: ({tintColor}: Object, focused: boolean) => (
          <Ionicons
            name={`${getIconPre()}-barcode`}
            size={20}
            color={focused ? WHITE : tintColor}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: WHITE,
      activeBackgroundColor: LIGHT_BLUE,
      inactiveTintColor: GREY,
      showLabel: true,
      // Android
      scrollEnabled: true,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: WHITE,
      },
      tabStyle: {
        height: 50,
      },
    },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Tab1',
    backBehavior: 'initialRoute',
  },
);
