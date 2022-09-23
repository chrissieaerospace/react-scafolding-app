/* eslint-disable global-require */
// import { batchDispatchMiddleware } from 'redux-batched-actions';
import { batchedSubscribe } from 'redux-batched-subscribe';
import debounce from 'lodash.debounce';
import { store as configureStore } from 'react-boilerplate-redux-saga-hoc';
const initialState = {};
const WAIT_TIME = 100;
const DEBOUNCE_CONFIG = {
  maxWait: WAIT_TIME * 2,
};
// let count = 1;
const enhancers = [
  batchedSubscribe(
    debounce(
      (notify) => {
        // console.log('=====Reducer Updated====', count);
        // count += 1;
        notify();
      },
      WAIT_TIME,
      DEBOUNCE_CONFIG,
    ),
  ),
];
const middlewares = [
  /* other middlewares */
];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
export const store = configureStore(initialState, middlewares, enhancers);
