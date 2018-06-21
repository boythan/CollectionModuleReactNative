import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

class BarCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------
  onBarCodeRead(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    Alert.alert('Barcode: ' + e.data, 'Type: ' + e.type)
  }

  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          barCodeTypes={[Camera.constants.BarCodeType.qr]}>
        </Camera>
      </View>
    );
  }
};

// Redux
const mapStateToProps = state => ({
})

// Any actions to map to the component?
const mapDispatchToProps = {

}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(BarCodeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});