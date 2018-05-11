// @flow

import {Platform} from 'react-native';

export default function getIconPre(): string {
  return Platform.OS === 'ios' ? 'ios' : 'md';
}
