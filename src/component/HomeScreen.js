import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Keyboard,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Messages from '../constant/message';

import {Actions} from 'react-native-router-flux';
import StringUtils from '../utils/StringUtils'
import API from '../network/API';
import AccessTokenManager from '../data/AccessTokenManager';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // UI CONTROL
  // -----------------------------------------------------------------------------

  doLogout(){
    AccessTokenManager.clear();
    Actions.login()
  }
  // - --- UI RENDER
  // -----------------------------------------------------------------------------
  // - ----
  render() {

    return <View style={styles.container}>
      <TouchableOpacity style={styles.buttonText} onPress={() => Actions.product()}>
        <Text>{Messages.home.product}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => Actions.camera()}>
        <Text>{Messages.camera}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => this.doLogout()}>
        <Text>{Messages.logout}</Text>
      </TouchableOpacity>
    </View>

  }
};

// Redux
const mapStateToProps = state => ({})

// Any actions to map to the component?
const mapDispatchToProps = {}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    height: 40,
    width: 150,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  }
});