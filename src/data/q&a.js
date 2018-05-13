// @flow

type Answer = [
  {
    value: string,
    isCorrect: boolean,
  },
];

export type QA = {
  id: number,
  hint: string,
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
    hint: 'Air Terjun UMN',
    coor: {
      lat: 6.123123123,
      long: -124.2313124,
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
    hint: 'Taman Parkir Utara UMN',
    coor: {
      lat: 6.123123123,
      long: -124.7878798,
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
    hint: 'Kantin UMN',
    coor: {
      lat: 6.7878799,
      long: -124.7878798,
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
    hint: 'Toilet Lantai 2',
    coor: {
      lat: 6.7878799,
      long: -124.7878798,
    },
    question:
      'Manakah salah satu perintah style untuk membuat bentuk garis menjadi bundar ?',
    answers: [
      {
        value: 'BackgroundColor',
        isCorrect: false,
      },
      {
        value: 'borderRadius',
        isCorrect: true,
      },
      {
        value: 'borderColor',
        isCorrect: false,
      },
      {
        value: 'roundedBorder',
        isCorrect: false,
      },
    ],
  },
];
