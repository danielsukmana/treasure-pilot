// @flow

import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {Achievement, Compass, Scaner} from '../scenes';
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
      screen: Scaner,
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
