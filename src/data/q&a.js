// @flow

export const qaList = [
  {
    id: 1,
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
    question: 'Siapakah CTO dari KodeFox ?',
    answers: [
      {
        value: 'Daniel Sukmana',
        isCorrect: false,
      },
      {
        value: 'DoMi',
        isCorrect: false,
      },
      {
        value: 'Simon',
        isCorrect: true,
      },
      {
        value: 'Juang',
        isCorrect: false,
      },
    ],
  },
];
