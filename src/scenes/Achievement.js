// @flow

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {qaList} from '../data/q&a';
import type {RootState} from '../reducers';

type Props = {
  navigation: Navigation,
  succeedList: Array<number>,
};

type Data = {id: number, hint: string};
type State = {
  achievements: Array<Data>,
};

class Achievement extends Component<Props, State> {
  state = {
    achievements: [],
  };
  componentDidMount() {
    let {navigation} = this.props;
    let {achievements} = this.state;
  }

  render() {
    let {achievements} = this.state;
    return (
      <View style={styles.container}>
        <Text>{this.props.succeedList}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    succeedList: state.qa.succeedList,
  };
};
export default connect(mapStateToProps)(Achievement);
let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
