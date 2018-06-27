import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import Messages from '../constant/message';

import { Actions } from 'react-native-router-flux';
import API from '../network/API';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // UI CONTROL
  // -----------------------------------------------------------------------------

  // - --- UI RENDER
  // -----------------------------------------------------------------------------
  // - ----

  renderButton(content, action) {
    return (
      <TouchableOpacity style={styles.buttonText}
        onPress={action && action}>
        <Text>{content}</Text>
      </TouchableOpacity>
    )
  }
  render() {

    return <View style={styles.container}>
      {this.renderButton(Messages.elevator, () => Actions.elevator())}
      {this.renderButton(Messages.rotateImage, () => Actions.rotateImage())}
      {this.renderButton(Messages.instagram, () => Actions.loginInstagram())}

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