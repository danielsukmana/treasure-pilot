import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import {qaList} from '../data/q&a';

type Props = {
  navigation: Navigation,
};

type State = {
  hasCameraPermission: boolean,
  data: ?{
    id: number,
    type: string,
  },
};
export default class BarcodeScannerExample extends Component<Props, State> {
  state = {
    hasCameraPermission: null,
    data: null,
  };

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const {hasCameraPermission} = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
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
    let {navigation} = this.props;
    let {type, id} = data;
    switch (type) {
      case 'qa':
        navigation.navigate('QACard', {data});
        break;
      default:
        navigation.navigate('QACard', {data});
        break;
    }
  };
}
