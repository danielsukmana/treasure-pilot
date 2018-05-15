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
  Alert,
  Modal,
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Expo, {Constants, Location, Permissions} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {LIGHT_BLUE, ORANGE, WHITE, TRANSPARENT} from '../general/colors';
import Header from '../general/core-ui/Header';
import getStatusBarHeight from '../helpers/getStatusBarHeight';
import getIconPre from '../helpers/getIconPre';
import calculateDistance from '../helpers/calculateDistance';
import {connect} from 'react-redux';

import type {RootState} from '../reducers';

type Props = {
  navigation: Navigation,
  targetCoordinate: {
    x: string,
    y: string,
  },
  hint: string,
  hintImage: ImageSource,
};

type State = {
  isCompassActive: boolean,
  isNeddleActive: boolean,
  vector: ?{
    x: number,
    y: number,
    z: number,
  },
  currentCoordinate: {
    x: number,
    y: number,
  },
  heading: number,
  isCompassActive: boolean,
  isHintVisible: boolean,
};
class Compass extends Component<Props, State> {
  constructor() {
    super(...arguments);
    this.state = {
      currentCoordinate: {
        x: 0,
        y: 0,
      },
      heading: 0,
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
    let {navigation, targetCoordinate, hint, hintImage} = this.props;
    let {
      currentCoordinate,
      heading,
      vector,
      isCompassActive,
      isNeddleActive,
      isHintVisible,
    } = this.state;
    let theta = 0;
    if (vector) {
      let {x, y, z} = vector;
      theta = Math.atan(x / y);
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
              <Image
                source={hintImage}
                style={{width: '100%', height: '70%', marginVertical: 20}}
                resizeMode="contain"
                resizeMethod="resize"
              />
              <Text style={styles.hintText}>{hint}</Text>
            </View>
          </View>
        </Modal>
        <Header
          title="Treasure Pilot"
          rightIcon={
            <Ionicons name={`${getIconPre()}-trophy`} size={30} color={WHITE} />
          }
          onRightIconPress={() => navigation.navigate('Achievement')}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
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
        </View>
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
                <Text style={styles.distanceValue}>
                  {calculateDistance(
                    {
                      lat: currentCoordinate.x,
                      lon: currentCoordinate.y,
                    },
                    {
                      lat: targetCoordinate.x,
                      lon: targetCoordinate.y,
                    },
                  )}
                </Text>
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
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  marginTop: 5,
                  marginLeft: 10,
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

const mapStateToProps = (state: RootState) => {
  let {qaList, currentAchievement} = state.qa;
  if (currentAchievement == null) {
    index = 0;
  } else {
    index = currentAchievement + 1;
  }
  let coordinates = qaList[index].coor;
  return {
    targetCoordinate: {x: coordinates.lat, y: coordinates.long},
    hint: qaList[index].hint,
    hintImage: qaList[index].hintImage,
  };
};

export default connect(mapStateToProps, null)(Compass);

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
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  distance: {
    padding: 5,
    backgroundColor: 'rgba(12,12,125,0.7)',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    backgroundColor: LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 5,
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 + getStatusBarHeight() : 20,
  },
  hintText: {
    color: WHITE,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
  },
});
