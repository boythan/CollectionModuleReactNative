/**
 * App Navigation
 */
import React from 'react';
import { Actions, Scene, Stack, Router } from 'react-native-router-flux';

// Scenes
import HomeScreen from '../component/HomeScreen.js';
import SplashScreen from '../component/SplashScreen.js';
import BarCodeScreen from '../component/barcode/BarCodeScreen';
import LoginScreen from '../component/auth/LoginScreen';
import ProductScreen from '../component/product/ProductScreen';
import CameraViewScreen from '../component/barcode/CameraViewScreen';


/* Routes ==================================================================== */
export default Actions.create(
  <Router>
    <Stack key="root" hideNavBar panHandlers={null}>
      <Scene key="splash" component={SplashScreen} />
      <Scene key="home" component={HomeScreen} />
      <Scene key="barcode" component={BarCodeScreen} />
      <Scene key="login" component={LoginScreen} />
      <Scene key="product" component={ProductScreen} />
      <Scene key="camera" component={CameraViewScreen} />
    </Stack>
  </Router>
);
