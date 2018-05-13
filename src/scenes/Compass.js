//@flow

import React, {PureComponent} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Expo from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {LIGHT_BLUE, ORANGE, WHITE} from '../general/colors';
import getStatusBarHeight from '../helpers/getStatusBarHeight';

type Props = {
  navigation: Navigation,
};

type State = {
  isCompassActive: boolean,
  vector: ?{
    x: number,
    y: number,
    z: number,
  },
  deviceCoordinate: ?{
    lat: number,
    lon: number,
  },
};
export default class Compass extends Component<Props, State> {
  _positionListener: ?{remove: () => void};

  constructor() {
    super(...arguments);
    state = {
      isCompassActive: false,
      vector: null,
      deviceCoordinate: null,
    };
  }

  _setupLocationAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status === 'granted') {
      let {
        coords: {latitude, longitude},
      } = await Expo.Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      this.setState({deviceCoordinate: {lat: latitude, lon: longitude}});
      this._positionListener = await Expo.Location.watchPositionAsync();
    } else {
      Alert.alert(
        'Permission Denied',
        `Oops! Seems like you denied our permission request. We need to access your device's location to track where you are and guide you to the treasure. So let's enable it and start hunting!`,
      );
    }
  };

  _setupMagnetometerAsync = async () => {
    Expo.Magnetometer.addListener((vector) => {
      this.setState({vector});
    });
  };

  componentDidMount() {
    this._setupLocationAsync();
    this._setupMagnetometerAsync();
  }

  componentWillUnmount() {
    if (this._positionListener) {
      this._positionListener.remove();
    }
  }

  render() {
    let {navigation} = this.props;
    let {vector, deviceCoordinate} = this.state;
    let theta = 0;
    if (vector) {
      let {x, y, z} = vector;
      theta = Math.atan(-x / y);
      if (-x > 0 && y > 0) {
        theta = theta;
      } else if (y > 0) {
        theta += Math.PI;
      } else {
        theta += Math.PI * 2;
      }
    }
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
          style={{
            width: 300,
            height: 300,
            transform: [{rotate: `${theta}rad`}],
          }}
          resizeMode="contain"
        />
        <View style={styles.distance}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: WHITE,
                fontSize: 40,
                fontWeight: '500',
              }}
            >
              10
            </Text>
            <Text style={{color: WHITE, fontSize: 20, fontWeight: '300'}}>
              METER
            </Text>
          </View>
        </View>
      </View>
    );
  }
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
