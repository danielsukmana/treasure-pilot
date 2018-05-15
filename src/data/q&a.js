// @flow

import hintImage1 from '../assets/locationHint1.jpeg';
import hintImage2 from '../assets/locationHint2.jpeg';
import hintImage3 from '../assets/locationHint3.jpeg';
import hintImage4 from '../assets/locationHint4.jpeg';

type Answer = [
  {
    value: string,
    isCorrect: boolean,
  },
];

export type QA = {
  id: number,
  hint: string,
  hintImage: ImageSource,
  coor: {
    lat: number,
    long: number,
  },
  question: string,
  answers: Array<Answer>,
};

//$FlowFixMe
export const qaList: Array<QA> = [
  {
    id: 1,
    hint: 'Presiden Direktur Kompas-Gramedia Group',
    hintImage: hintImage1,
    coor: {
      lat: -6.2578275,
      long: 106.6187545,
    },
    question:
      'Apakah perintah untuk membuat inital project bernama uangku menggunakan create-react-native-app ?',
    answers: [
      {
        value: 'crna new uangku',
        isCorrect: false,
      },
      {
        value: 'create-react-native-app init uangku',
        isCorrect: false,
      },
      {
        value: 'crna init uangku',
        isCorrect: false,
      },
      {
        value: 'create-react-native-app uangku',
        isCorrect: true,
      },
    ],
  },
  {
    id: 2,
    hint: 'Drop off gedung D',
    hintImage: hintImage2,
    coor: {
      lat: -6.2579458,
      long: 106.6190727,
    },
    question:
      'Manakah komponen dari React Native yang dapat digunakan untuk membuat sebuah Button?',
    answers: [
      {
        value: 'Text',
        isCorrect: false,
      },
      {
        value: 'TouchableOpacity',
        isCorrect: true,
      },
      {
        value: 'Image',
        isCorrect: false,
      },
      {
        value: 'StyleSheet',
        isCorrect: false,
      },
    ],
  },
  {
    id: 3,
    hint: 'Tiang',
    hintImage: hintImage3,
    coor: {
      lat: -6.2577975,
      long: 106.6187615,
    },
    question:
      'Untuk membuat suatu komponen di React Native maka kita memerlukan modul utama yang disebut ...',
    answers: [
      {
        value: 'React',
        isCorrect: true,
      },
      {
        value: 'View',
        isCorrect: false,
      },
      {
        value: 'React-Native',
        isCorrect: false,
      },
      {
        value: 'StyleSheet',
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    hint: 'Keamanan',
    hintImage: hintImage4,
    coor: {
      lat: -6.2574726,
      long: 106.6185114,
    },
  },
];
