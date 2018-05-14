// @flow

import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {ORANGE, LIGHT_BLUE, WHITE} from '../general/colors';
import Header from '../general/core-ui/Header';
import getStatusBarHeight from '../helpers/getStatusBarHeight';
import getIconPre from '../helpers/getIconPre';

import type {RootState} from '../reducers';
import type {QA} from '../data/q&a';

type Props = {
  navigation: Navigation,
  qaList: Array<QA>,
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

  render() {
    let {achievements} = this.state;
    let {qaList, succeedList, navigation} = this.props;
    let cards = <View />;
    if (succeedList) {
      cards = succeedList.map((item, index) => (
        <Card key={index} data={qaList[item - 1]} />
      ));
    }

    return (
      <View style={styles.container}>
        <Header
          title="Pencapaian"
          leftIcon={
            <Ionicons
              name={`${getIconPre()}-arrow-back`}
              size={30}
              color={WHITE}
            />
          }
          onLeftIconPress={() => navigation.goBack()}
        />
        {cards.length > 0 ? (
          <ScrollView contentContainerStyle={{margin: 5, flex: 1}}>
            {cards}
          </ScrollView>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Ayo cari dan temukan kode QR untuk mendapatkan achievement!
            </Text>
          </View>
        )}
      </View>
    );
  }
}

type CardType = {
  data: QA,
};

function Card(props: CardType) {
  let {data} = props;
  let rightAnswer = '';
  data.answers.forEach((answer) => {
    if (answer.isCorrect) {
      //$FlowFixMe
      rightAnswer += answer.value;
    }
  });
  return (
    <View style={styles.wrapper}>
      <Text style={styles.subtitle}>Misi ke {`${data.id}`}</Text>
      <Image
        source={{
          uri:
            'https://cdn.pixabay.com/photo/2016/08/11/18/01/order-1586385__340.png',
        }}
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          height: 60,
          width: 60,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{flex: 1}}>
          <Text style={styles.question}>{data.question}</Text>
          <Text style={[styles.question, {fontWeight: 'bold'}]}>
            {rightAnswer}
          </Text>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    qaList: state.qa.qaList,
    succeedList: state.qa.succeedList,
  };
};

export default connect(mapStateToProps)(Achievement);
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    paddingTop: getStatusBarHeight(),
    height: 80,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingTop: getStatusBarHeight() + 10,
  },
  back: {
    width: 36,
    height: 36,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: WHITE,
    textAlign: 'center',
  },
  wrapper: {
    width: '90%',
    backgroundColor: WHITE,
    borderRadius: 5,
    margin: 10,
  },
  subtitle: {
    color: WHITE,
    fontSize: 20,
    backgroundColor: '#607D8B',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  question: {
    backgroundColor: '#CFD8DC',
    color: '#37474F',
    padding: 10,
    fontSize: 16,
    color: 'grey',
    marginBottom: 5,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
  },
});
