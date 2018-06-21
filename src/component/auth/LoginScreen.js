import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';

import { Actions } from 'react-native-router-flux';
import * as UserActions from '@redux/user/action';
import { InputField } from '@base';
import { AppColors } from '@theme'
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  //UI CONTROL ---------------------------------------------------------------------------------

  onPressLogin() {
    const { email, password } = this.state;

    this.props.login(email, password).then(res => {
      console.log('login Success', res)
      Actions.home();
    }).catch(err => {
      console.log('login Fail', err)
      let error;
      if (err.response && err.response.data) {
        error =  err.response.data.message;
      }
      Alert.alert(Messages.login.fail, error);
    });

  }

  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return (<View style={styles.container}>
      <TextInput
        ref='userNameInput'
        style={[styles.textInput]}
        autoCapitalize='none'
        autoCorrect={false}
        underlineColorAndroid='transparent'
        returnKeyType='next'
        placeholder={Messages.login.userName}
        placeholderTextColor={AppColors.textSecondary}
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
      />
      <TextInput
        ref='passwordInput'
        style={[styles.textInput]}
        autoCapitalize='none'
        autoCorrect={false}
        underlineColorAndroid='transparent'
        secureTextEntry={true}
        onSubmitEditing={this.onSubmited}
        returnKeyType='go'
        placeholder={Messages.login.password}
        placeholderTextColor={AppColors.textSecondary}
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
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
    marginTop: 5,
    height: 48,
    padding: 4
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