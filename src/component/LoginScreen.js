import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../constant/message';

import { Actions } from 'react-native-router-flux';
import * as UserActions from '@redux/user/action';
import { InputField } from '@base';
import { AppColors } from '@theme'
class LoginScreen extends Component {
  constructor(props) {
    super(props);

  }

  //UI CONTROL ---------------------------------------------------------------------------------

  onChangeText() {

  }

  onPressLogin() {
    const userName = this.refs.userName.getTextInputValue();
    const password = this.refs.password.getTextInputValue();

    this.props.login(userName, password).then(res => {
      console.log('login Success', res)
      Actions.home();
    }).catch(err => {
      console.log('login Fail', err)
      let error = err.error;
      if (err.response && err.response.data) {
        error = error || err.response.data.error;
      }
      Alert.alert(Messages.login.fail, error.message);
    });

  }
  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return (<View style={styles.container}>
      <InputField
        ref={'userName'}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.login.userName}
        editable={true}
        hintContent={Messages.login.userName}
        clickable={true}
        onChangeText={(text) => this.onChangeText()}
      />

      <InputField
        ref={'password'}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.login.password}
        editable={true}
        hintContent={Messages.login.password}
        clickable={true}
        onChangeText={(text) => this.onChangeText()}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={() => { this.onPressLogin() }}>
        <Text>{Messages.login.login}</Text>
      </TouchableOpacity>
    </View>)
  }
};

// Redux
const mapStateToProps = state => ({
})

// Any actions to map to the component?
const mapDispatchToProps = {
  login: UserActions.doLogin
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  textInput: {
    width: '70%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.lightgray,
    backgroundColor: 'white',
    marginTop: 5
  },
  buttonLogin: {
    width: '70%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.lightgray,
    backgroundColor: 'white',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});