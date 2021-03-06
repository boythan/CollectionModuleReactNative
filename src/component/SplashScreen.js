import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../constant/message';
import { Actions } from 'react-native-router-flux';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    Actions.home();
  }
  //UI CONTROL ---------------------------------------------------------------------------------


  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    return <View style={styles.container}>
      <Text style={styles.text}>{'Splash Screen'}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: 5,
  }
});