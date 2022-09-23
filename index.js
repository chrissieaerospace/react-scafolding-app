/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store as configureStore } from 'react-boilerplate-redux-saga-hoc';
import App from './App';
import { name as appName } from './app.json';
const initialState = {};
const store = configureStore(initialState);
const Root = (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);
AppRegistry.registerComponent(appName, () => Root);
