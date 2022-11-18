/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
// import { store as configureStore } from 'react-boilerplate-redux-saga-hoc';
import { store } from './store';
import App from './App';
import { name as vr360 } from './app.json';
// const initialState = {};
// const store = configureStore(initialState);
const Root = (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);
AppRegistry.registerComponent(vr360, () => Root);
