// @flow

import {Platform, StatusBar} from 'react-native';

export default function getStatusBarHeight(): number {
  return Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
}
