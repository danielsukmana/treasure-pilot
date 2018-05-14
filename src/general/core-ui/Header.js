// @flow

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {LIGHT_BLUE, WHITE} from '../../general/colors';
import getStatusBarHeight from '../../helpers/getStatusBarHeight';

type Props = {
  title: string,
  leftIcon: ?ReactNode,
  onLeftIconPress: ?() => void,
  rightIcon: ?ReactNode,
  onRightIconPress: ?() => void,
};

export default function Header(props: props) {
  let {title, leftIcon, onLeftIconPress, rightIcon, onRightIconPress} = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {leftIcon ? (
          <TouchableOpacity
            onPress={() => {
              if (onLeftIconPress) {
                onLeftIconPress();
              }
            }}
          >
            {leftIcon}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Text style={styles.title}> {title} </Text>
      <View style={styles.iconContainer}>
        {rightIcon ? (
          <TouchableOpacity
            onPress={() => {
              if (onRightIconPress) {
                onRightIconPress();
              }
            }}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
    height: 80,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingTop: getStatusBarHeight() + 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: WHITE,
    textAlign: 'center',
  },
});
