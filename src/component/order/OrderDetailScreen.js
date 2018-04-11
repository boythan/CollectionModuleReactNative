
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';


import { Actions } from 'react-native-router-flux';
import * as PositionsActions from '../../redux/action';
import API from '../../network/API';
import { NavBar } from '@base'

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------

  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return <View style={styles.container}>
      <NavBar title={Messages.home.order}
        leftButtonAction={() => Actions.pop()} />
      <TouchableOpacity style={styles.buttonText}>
        <Text>{this.props.order.login}</Text>
      </TouchableOpacity>
    </View>


  }
};

// Redux
const mapStateToProps = state => ({

})

// Any actions to map to the component?
const mapDispatchToProps = {
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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