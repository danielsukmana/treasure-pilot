// @flow

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  navigation: Navigation,
};

export default function Achievement(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Scaner</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
