/**
 * App Navigation
 */
import React from 'react';
import { Actions, Scene, Stack, Router } from 'react-native-router-flux';

// Scenes
import HomeScreen from '../component/HomeScreen.js';
import SplashScreen from '../component/SplashScreen.js';
import BarCodeScreen from '../component/BarCodeScreen';
import QRCodeScreen from '../component/QRCodeScreen';
import LoginScreen from '../component/LoginScreen';
import ProductScreen from '../component/product/ProductScreen';
import ProductDetailScreen from '../component/product/ProductDetailScreen';
import OrderScreen from '../component/order/OrderScreen';
import OrderDetailScreen from '../component/order/OrderDetailScreen';
import UserProfileScreen from '../component/UserProfileScreen';
import CreateEditProductScreen from '../component/product/CreateEditProductScreen';
import Progress from '../base/ui/lightbox/Progress';


/* Routes ==================================================================== */
export default Actions.create(
  <Router>
    <Stack key="root" hideNavBar panHandlers={null}>
      <Scene key="splash" component={SplashScreen} />
      <Scene key="home" component={HomeScreen} />
      <Scene key="qrcode" component={QRCodeScreen} />
      <Scene key="barcode" component={BarCodeScreen} />
      <Scene key="login" component={LoginScreen} />
      <Scene key="product" component={ProductScreen} />
      <Scene key="order" component={OrderScreen} />
      <Scene key="productDetail" component={ProductDetailScreen} />
      <Scene key="orderDetail" component={OrderDetailScreen} />
      <Scene key="userProfile" component={UserProfileScreen} />
      <Scene key="createEditProduct" component={CreateEditProductScreen} />
      <Scene key="progress" component={Progress} />
    </Stack>
  </Router>
);
