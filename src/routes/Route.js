// @flow

import React from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {StatusBar, Platform} from 'react-native';

const ACTIVE_ICON_COLOR = '#FFFFFF';
const INACTIVE_ICON_COLOR = '#666666';
const ACTIVE_BACKGROUND_COLOR = '#6599FF';
const NAVBAR_BACKGROUND_COLOR = 'black';
const ICON_PRE = Platform.OS === 'ios' ? 'ios' : 'md';

let Screen1 = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Compass</Text>
    </View>
  );
};

let Screen2 = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Achievement</Text>
    </View>
  );
};

let Screen3 = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Scanner</Text>
    </View>
  );
};

const TreasureStackNav = createStackNavigator(
  {
    Treasure: {
      screen: Screen1,
    },
    Achievement: {
      screen: Screen2,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
    cardStyle: {paddingTop: StatusBar.currentHeight},
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
            name={`${ICON_PRE}-compass`}
            size={20}
            color={focused ? ACTIVE_ICON_COLOR : tintColor}
          />
        ),
      },
    },
    Tab2: {
      screen: Screen3,
      navigationOptions: () => ({
        tabBarLabel: 'Scanner',
        tabBarIcon: ({tintColor}: Object, focused: boolean) => (
          <Ionicons
            name={`${ICON_PRE}-barcode`}
            size={20}
            color={focused ? ACTIVE_ICON_COLOR : tintColor}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: ACTIVE_ICON_COLOR,
      activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
      inactiveTintColor: INACTIVE_ICON_COLOR,
      showLabel: true,
      // Android
      scrollEnabled: true,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: ACTIVE_ICON_COLOR,
      },
      style: {
        height: 40,
      },
      tabStyle: {
        height: 40,
      },
    },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Tab1',
    backBehavior: 'initialRoute',
  },
);
