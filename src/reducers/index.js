// @flow

import {combineReducers} from 'redux';

import qaReducer from './qa-reducer';

export default combineReducers({
  qa: qaReducer,
});
