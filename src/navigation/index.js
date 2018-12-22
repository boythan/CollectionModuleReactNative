/**
 * App Navigation
 */
import React from 'react';
import { Actions, Scene, Stack, Router } from 'react-native-router-flux';

// Scenes
import HomeScreen from '../component/HomeScreen.js';
import SplashScreen from '../component/SplashScreen.js';
import ElevatorInputScreen from '../component/elevator/ElevatorInputScreen.js';
import ElevatorSimulatorScreen from '../component/elevator/ElevatorSimulatorScreen.js';
import RotateImageScreen from '../component/rotateImage/RotateImageScreen.js';
import LoginInstagramScreen from '../component/instagram/LoginInstagramScreen.js';


/* Routes ==================================================================== */
export default Actions.create(
  <Router>
    <Stack key="root" hideNavBar panHandlers={null}>
      <Scene key="splash" component={SplashScreen} />
      <Scene key="home" component={HomeScreen} />
      <Scene key="elevator" component={ElevatorInputScreen} />
      <Scene key="elevatorSimulator" component={ElevatorSimulatorScreen} />
      <Scene key="rotateImage" component={RotateImageScreen} />
      <Scene key="loginInstagram" component={LoginInstagramScreen} />
      
    </Stack>
  </Router>
);
