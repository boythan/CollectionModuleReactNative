/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
const RouterWithRedux = connect()(Router);
import AppRoutes from './navigation/index';

import { connect, Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './redux/index';

// Load middleware
let middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    createLogger(), // Logs state changes to the dev console
  ];
}

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware),
)(createStore)(rootReducer);

export default class App extends Component {
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Provider store={store}>
          <RouterWithRedux scenes={AppRoutes} style={{ width: '100%', height: '100%', backgroundColor: '#fff', }} />
        </Provider>
      </View>
    );
  }
}

export { store };
