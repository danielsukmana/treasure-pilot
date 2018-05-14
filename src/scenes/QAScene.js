// @flow

import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

import {LIGHT_BLUE, ORANGE, WHITE} from '../general/colors';
import getStatusBarHeight from '../helpers/getStatusBarHeight';
import {qaList} from '../data/q&a';
import CheckItem from '../general/core-ui/CheckItem';
import type {RootState} from '../reducers';

type Props = {
  navigation: Navigation,
  currentAchievement: number,
  getSuccessAnswer: (newID: number) => void,
};
type State = {
  value: ?number,
};

class QAScene extends Component<Props, State> {
  state = {
    value: null,
  };
  render() {
    // $FlowFixMe;
    let {currentAchievement} = this.props;
    let qa = qaList[currentAchievement || 0];
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Question & Answer</Text>
        </View>
        <ScrollView>
          {currentAchievement === 3 ? this._renderFinish() : this._renderQA(qa)}
        </ScrollView>
      </View>
    );
  }
  _renderFinish() {
    return (
      <View>
        <Text>BERHASIL !!</Text>
      </View>
    );
  }
  _renderQA(qa) {
    return (
      <View>
        {this._renderQuestion(qa)}
        {this._renderAnswers(qa)}
        <TouchableOpacity
          onPress={() => this._onSubmit()}
          style={styles.submit}
        >
          <Text style={[styles.desc, {color: WHITE}]}>Jawab Pertanyaan</Text>
        </TouchableOpacity>
      </View>
    );
  }
  _renderQuestion(qa: Object) {
    return (
      <View style={styles.question}>
        <Text style={[styles.subtitle]}>Pertanyaan No. {qa.id}</Text>
        <Text style={styles.desc}>{qa.question}</Text>
      </View>
    );
  }

  _renderAnswers(qa: Object) {
    return (
      <View style={styles.question}>
        <Text style={styles.subtitle}>Pilih Jawaban</Text>
        <View style={styles.wrapper}>
          {qa.answers.map((answer, index) => (
            <Answer
              key={index}
              checked={index === this.state.value}
              value={answer.value}
              onPress={() => this._onAnswerClicked(index)}
            />
          ))}
        </View>
      </View>
    );
  }

  _onAnswerClicked(value) {
    this.setState({value});
  }

  _onSubmit() {
    let {currentAchievement, getSuccessAnswer} = this.props;
    let {value} = this.state;
    let qa = qaList[currentAchievement || 0];
    let isCorrect = false;
    if (value === null) {
      alert('Anda harus mengilih satu jawaban!');
      return;
    }
    isCorrect = qa.answers[value].isCorrect;
    if (!isCorrect) {
      alert('Jawaban Anda salah. Coba lagi.');
    } else {
      getSuccessAnswer(currentAchievement);
      //$FlowFixMe
      this.props.navigation.replace('Achievement');
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentAchievement: state.qa.currentAchievement || 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSuccessAnswer: (currenctQuestion) => {
      dispatch({
        type: 'SUCCEED_ANSWERED',
        payload: {
          newID: currenctQuestion + 1,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QAScene);

type AnswerProps = {
  checked: boolean,
  value: string,
  onPress: () => void,
};

function Answer(props: AnswerProps) {
  let {value, checked, onPress} = props;
  return (
    <TouchableOpacity style={styles.answer} onPress={onPress}>
      <CheckItem
        type="radioButton"
        size={23}
        color="grey"
        checked={checked}
        onPress={onPress}
      />
      <Text style={styles.desc}>{value}</Text>
    </TouchableOpacity>
  );
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: ORANGE,
  },
  header: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    maxHeight: 70,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: WHITE,
  },
  question: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: WHITE,
  },
  subtitle: {
    color: WHITE,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  desc: {
    color: 'grey',
    fontSize: 16,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 5,
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  submit: {
    borderRadius: 5,
    backgroundColor: LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
});
