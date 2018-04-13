
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';


import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import { NavBar, WebImage } from '@base'
import { InputField, Line } from '../../base';

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------

  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    const { product } = this.props;
    return <View style={styles.container}>
      <NavBar title={Messages.home.product}
        leftButtonAction={() => Actions.pop()} />

      <View style={styles.containerImage}>
        <WebImage
          source={{ uri: product.avatar_url }}
          resizeMode='cover'
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </View>
      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.product.title}
        clickable={true}
        editable={false}
        content={product.title}
      />
      <Line />
      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.product.description}
        clickable={true}
        editable={false}
        content={product.description}
      />
      <Line />
      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.product.price}
        clickable={true}
        editable={false}
        content={product.price}
      />
      <Line />

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
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
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
  },
  containerImage: {
    width: '100%',
    height: 150,
  },
  textInput: {
    backgroundColor: 'white',
  },
});