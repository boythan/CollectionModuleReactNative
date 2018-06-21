import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import Messages from '../../constant/message';

import {Actions} from 'react-native-router-flux';

import {ButtonIcon} from '../../base/index';
import {RNCamera} from 'react-native-camera';
import {Icon} from 'react-native-elements'

class CameraViewScreen extends Component {
  constructor(props) {
    super(props);

  }

  // UI CONTROL
  // -----------------------------------------------------------------------------
  // - ---

  onClickCapture = async() => {
    try {
      const data = await this
        .camera
        .takePictureAsync();
      this
        .props
        .callback(data);
      Actions.pop();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  // UI RENDER
  // -----------------------------------------------------------------------------
  // - ----
  render() {
    return <View style={styles.container}>

      <RNCamera
        ref={cam => {
        this.camera = cam;
      }}
        style={styles.preview}/>
      <TouchableOpacity style={styles.iconCapture} onPress={this.onClickCapture}>
        <Icon name={'camera-alt'} color={AppColors.iconColor} size={40}/>
      </TouchableOpacity>

    </View>
  }
};

// Redux
const mapStateToProps = state => ({})

// Any actions to map to the component?
const mapDispatchToProps = {}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(CameraViewScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  iconCapture: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20

  }
});