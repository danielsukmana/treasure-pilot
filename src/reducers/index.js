// @flow

import {combineReducers} from 'redux';
import qaReducer from './qa-reducer';
import type {QAState} from '../reducers/qa-reducer';

export default combineReducers({
  qa: qaReducer,
});

export type RootState = {
  qa: QAState,
};
