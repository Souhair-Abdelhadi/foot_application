/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import Store from './younness/redux/store/configureStore';


const RNRedux = () => (
    <Provider store = { Store }>
      <App />
    </Provider>
  )

//AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent(appName, () => RNRedux);
