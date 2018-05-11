//@flow

import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {LIGHT_BLUE, ORANGE, WHITE} from '../general/colors';
import getStatusBarHeight from '../helpers/getStatusBarHeight';

type Props = {
  navigation: Navigation,
};

export default function Compass(props: Props) {
  let {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.trophy}
          onPress={() => navigation.navigate('Achievement')}
        >
          <Image
            source={require('../assets/trophy.png')}
            style={{
              width: 36,
              height: 36,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Treasure Pilot</Text>
      </View>
      <ImageBackground
        source={require('../assets/compass.png')}
        style={styles.background}
        resizeMode="contain"
      />
      <View style={styles.distance}>
        <Text style={{color: WHITE, fontSize: 40, fontWeight: '500'}}>10</Text>
        <Text style={{color: WHITE, fontSize: 20, fontWeight: '300'}}>
          METER
        </Text>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ORANGE,
  },
  header: {
    position: 'absolute',
    top: getStatusBarHeight(),
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex: 0,
  },
  trophy: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderColor: WHITE,
    borderRadius: 18,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    color: WHITE,
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    margin: 40,
  },
  distance: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});
