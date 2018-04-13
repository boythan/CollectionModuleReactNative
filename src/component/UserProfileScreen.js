
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../constant/message';


import { Actions } from 'react-native-router-flux';
import API from '../network/API';
import { NavBar } from '@base';


class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  //UI CONTROL ---------------------------------------------------------------------------------

  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return <View style={styles.container}>
      <NavBar title={Messages.home.profile}
        leftButtonAction={() => Actions.pop()} />
      <Text>{this.props.account.userId}</Text>
      <TouchableOpacity style={styles.buttonText} onPress={() => {
        this.props.login({
          name: 'change'
        });
      }}>
        <Text>{'Click'}</Text>
      </TouchableOpacity>
    </View>


  }
};

// Redux
const mapStateToProps = state => ({
  account: state.userAccount.account
})

// Any actions to map to the component?
const mapDispatchToProps = {

}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);

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