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
  Modal,
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Expo, {Constants, Location, Permissions} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {LIGHT_BLUE, ORANGE, WHITE, TRANSPARENT} from '../general/colors';
import getStatusBarHeight from '../helpers/getStatusBarHeight';
import getIconPre from '../helpers/getIconPre';

type Props = {
  navigation: Navigation,
};

type State = {
  isCompassActive: boolean,
  isNeddleActive: boolean,
  vector: ?{
    x: number,
    y: number,
    z: number,
  },
  targetCoordinate: {
    x: string,
    y: string,
  },
  currentCoordinate: {
    x: '',
    y: '',
  },
  heading: '',
  isCompassActive: boolean,
  isHintVisible: boolean,
};
export default class Compass extends PureComponent<Props, State> {
  constructor() {
    super(...arguments);
    this.state = {
      targetCoordinate: {
        x: '-6.257188',
        y: '106.619114',
      },
      currentCoordinate: {
        x: '',
        y: '',
      },
      heading: '',
      isCompassActive: false,
      isNeddleActive: true,
      vector: null,
      isHintVisible: false,
    };
  }

  _setupMagnetometerAsync = async () => {
    Expo.Magnetometer.addListener((vector) => {
      this.setState({vector});
    });
  };

  componentDidMount() {
    this._getLocationAsync();
    this._setupMagnetometerAsync();
  }

  render() {
    let {navigation} = this.props;
    let {
      currentCoordinate,
      targetCoordinate,
      heading,
      vector,
      isCompassActive,
      isNeddleActive,
      isHintVisible,
    } = this.state;
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
    console.log(
      calculateDegree(currentCoordinate, targetCoordinate, heading) + 'deg',
    );

    return (
      <View style={styles.container}>
        <Modal
          transparent
          visible={isHintVisible}
          animationType="fade"
          onRequestClose={() => this.setState({isHintVisible: false})}
        >
          <View style={styles.hintModal}>
            <TouchableOpacity
              hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
              onPress={() => this.setState({isHintVisible: false})}
            >
              <Ionicons
                name={`${getIconPre()}-close`}
                size={25}
                color={WHITE}
              />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Image />
              <Text />
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <View style={styles.trophy} />
          <Text style={styles.title}>Treasure Pilot</Text>
          <TouchableOpacity
            style={styles.trophy}
            hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
            onPress={() => navigation.navigate('Achievement')}
          >
            <Ionicons name={`${getIconPre()}-trophy`} size={30} color={WHITE} />
          </TouchableOpacity>
        </View>
        {isCompassActive ? (
          <ImageBackground
            source={require('../assets/compass.png')}
            style={{
              width: 300,
              height: 300,
              transform: [{rotate: `${theta}rad`}],
            }}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../assets/arrow.png')}
            style={{
              width: 200,
              height: 200,
              transform: [
                {
                  rotateZ:
                    calculateDegree(
                      currentCoordinate,
                      targetCoordinate,
                      heading,
                    ) + 'deg',
                },
              ],
            }}
            resizeMode="contain"
          />
        )}
        <TouchableOpacity
          onPress={() => this._onCompassActive()}
          style={styles.button}
        >
          <Text style={styles.text}>
            {isCompassActive ? `Matikan Kompas` : `Aktifkan Kompas`}
          </Text>
        </TouchableOpacity>
        <View style={styles.distance}>
          <View style={{alignSelf: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 28, height: 28}} />
              <View style={{alignItems: 'center'}}>
                <Text style={styles.distanceValue}>10</Text>
                <Text style={styles.meter}>METER</Text>
              </View>
              <TouchableOpacity
                hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
                onPress={() => this.setState({isHintVisible: true})}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: WHITE,
                  borderWidth: 1,
                  borderRadius: 14,
                  width: 28,
                  height: 28,
                }}
              >
                <Ionicons
                  name={`${getIconPre()}-help`}
                  size={20}
                  color={WHITE}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _onCompassActive() {
    let {isCompassActive, isNeddleActive} = this.state;
    this.setState({
      isCompassActive: !isCompassActive,
      isNeddleActive: !isNeddleActive,
    });
  }

  _getLocationAsync = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    Location.watchHeadingAsync((heading) => {
      this.setState({heading: heading.magHeading});
    });
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 5000,
        distanceInterval: 1,
      },
      (position) => {
        this.setState({
          currentCoordinate: {
            x: position.coords.latitude,
            y: position.coords.longitude,
          },
        });
      },
    );
  };
}

function calculateDegree(currentCoordinate, targetCoordinate, heading: number) {
  return (
    degreeToNorth(heading) +
    degreeFromNorth(currentCoordinate, targetCoordinate)
  );
}

function degreeToNorth(heading: number) {
  if (heading > 180) {
    return 360 - heading;
  }
  return heading * -1;
}

function degreeFromNorth(currentCoordinate, targetCoordinate) {
  let theta = getTheta(currentCoordinate, targetCoordinate);
  let degreeFromNorth =
    getDegree(currentCoordinate.y, targetCoordinate.y) - theta;
  let xCoordinates = {x1: currentCoordinate.x, x2: targetCoordinate.x};
  if (getSign(degreeFromNorth, xCoordinates) > 0) {
    return degreeFromNorth;
  } else {
    return 360 - degreeFromNorth;
  }
}

function getTheta(currentCoordinate, targetCoordinate) {
  let opposite;
  let adjacent;
  if (targetCoordinate.x > currentCoordinate.x) {
    opposite = Math.abs(targetCoordinate.x - currentCoordinate.x);
    adjacent = Math.abs(targetCoordinate.y - currentCoordinate.y);
  } else {
    opposite = Math.abs(targetCoordinate.y - currentCoordinate.y);
    adjacent = Math.abs(targetCoordinate.x - currentCoordinate.x);
  }
  let radian = Math.atan(opposite / adjacent);
  return radian * 180 / Math.PI;
}

function getDegree(yOrigin, yDestination) {
  if (yDestination > yOrigin) {
    return 90;
  }
  return 180;
}

function getSign(x, xCoordinates) {
  return isDisplacementBendRight(xCoordinates.x1, xCoordinates.x2)
    ? x * 1
    : x * -1;
}

function isDisplacementBendRight(xOrigin, xDestination) {
  return xDestination > xOrigin;
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: getStatusBarHeight() + 10,
  },
  trophy: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 20,
    color: WHITE,
    flex: 1,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    margin: 40,
  },
  distance: {
    padding: 5,
    backgroundColor: 'rgba(12,12,125,0.7)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    borderRadius: 5,
    backgroundColor: LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    position: 'absolute',
    bottom: 100,
  },
  text: {
    color: WHITE,
    fontSize: 16,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  distanceValue: {
    color: WHITE,
    fontSize: 40,
    fontWeight: '500',
  },
  meter: {color: WHITE, fontSize: 20, fontWeight: '300'},
  hintModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 + getStatusBarHeight() : 20,
  },
});
