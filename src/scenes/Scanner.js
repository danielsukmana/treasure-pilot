// @flow

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import {BarCodeScanner, Permissions} from 'expo';
import {qaList} from '../data/q&a';
import {LIGHT_BLUE, WHITE} from '../general/colors';

type QRData = {
  id: number,
  type: string,
};

type Props = {
  navigation: Navigation,
  saveQRData: (QRData) => void,
};

type State = {
  hasCameraPermission: boolean,
  data: ?QRData,
};
class Scanner extends Component<Props, State> {
  state = {
    hasCameraPermission: false,
    data: null,
  };

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const {hasCameraPermission} = this.state;

    if (hasCameraPermission === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Requesting for camera permission</Text>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No access to camera</Text>
          <TouchableOpacity
            onPress={() => this.setState({hasCameraPermission: true})}
            style={styles.button}
          >
            <Text style={{color: WHITE, fontSize: 16}}>Aktifkan Kamera</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({data}) => {
    let {navigation, saveQRData} = this.props;
    let QRData = JSON.parse(data);
    if (QRData.type === 'qa') {
      saveQRData(QRData);
      navigation.navigate('QACard');
      this.setState({hasCameraPermission: false});
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveQRData: (QRData) => {
      dispatch({
        type: 'SAVE_QR_DATA',
        payload: {
          id: QRData.id - 1,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Scanner);
let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: LIGHT_BLUE,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
