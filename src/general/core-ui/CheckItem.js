// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {ORANGE} from '../colors';

type Props = {
  checked: boolean,
  onPress?: () => void,
  size: number,
  color: string,
  style?: StyleSet,
  type?: 'radioButton' | 'checkBox',
};

function CheckItem(props: Props) {
  let {checked, size, color, type, style, onPress} = props;
  let iconName = '';
  if (type === 'radioButton') {
    iconName = checked ? 'radio-button-checked' : 'radio-button-unchecked';
  } else {
    iconName = checked ? 'check-box' : 'crop-square';
  }
  let checkComp = (
    <MaterialIcons name={iconName} size={size} color={color} style={style} />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{checkComp}</TouchableOpacity>;
  }
  return checkComp;
}

export default CheckItem;
