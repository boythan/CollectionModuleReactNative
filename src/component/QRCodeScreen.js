import React, { Component } from 'react';
import { View, StyleSheet, Text, Button , TouchableOpacity, Alert} from 'react-native';
import { connect } from 'react-redux';
import Messages from '../constant/message';

import { Actions } from 'react-native-router-flux';

import QRCodeScanner from 'react-native-qrcode-scanner';

class QRCodeScreen extends Component {
  constructor(props) {
    super(props);

  }

  //UI CONTROL ---------------------------------------------------------------------------------
  onSuccess(e) {
    console.log('Result QRCode: ', e.data);
    Alert.alert('Result QRCode: ', e.data)
    // Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }

  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return <QRCodeScanner
      title='Scan Code'
      onRead={this.onSuccess.bind(this)}
      topContent={(
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
      </Text>
      )}
      bottomContent={(
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      )}
    />
  }
};

// Redux
const mapStateToProps = state => ({
  positions: state.postionReducer.positions
})

// Any actions to map to the component?
const mapDispatchToProps = {

}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScreen);

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});