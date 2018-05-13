// @flow

import React from 'react';
import {Provider} from 'react-redux';
import store from './createStore';
import {Tabs} from './routes/Route';

export default () => (
  <Provider store={store}>
    <Tabs />
  </Provider>
);
