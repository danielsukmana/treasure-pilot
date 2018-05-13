//@flow

import {qaList} from '../data/q&a';
import type {QA} from '../data/q&a';

export type QAState = {
  qaList: Array<QA>,
  currentAchievement: ?number,
  succeedList: Array<number>,
};

type Action = {
  type: string,
  payload: Object,
};

const initialState: QAState = {
  qaList: qaList,
  currentAchievement: null,
  succeedList: [],
};

export default function qaReducer(
  state: QAState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'FETCH_CURRENT_QA':
      return {
        ...state,
        currentAchievement: action.payload.id,
      };
    case 'SAVE_QR_DATA':
      return {
        ...state,
        currentAchievement: action.payload.id,
      };
    case 'SUCCEED_ANSWERED':
      return {
        ...state,
        succeedList: [...state.succeedList, action.payload],
      };
    default:
      return state;
  }
}
