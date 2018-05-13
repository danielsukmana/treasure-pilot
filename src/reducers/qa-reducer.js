//@flow

import {qaList} from '../data/q&a';
import type {QA} from '../data/q&a';

type State = {
  qaList: Array<QA>,
  currentAchievement: number,
};

type Action = {
  type: string,
  payload: Object,
};

const initialState: State = {
  qaList: qaList,
  currentAchievement: 1,
};

export default function qaReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'FETCH_CURRENT_QA':
      return {
        ...state,
        currentAchievement: action.payload.id,
      };
    default:
      return state;
  }
}
