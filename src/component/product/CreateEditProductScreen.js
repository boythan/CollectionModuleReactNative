
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';


import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import { NavBar, WebImage } from '@base'
import { InputField, Line, Progress } from '../../base';
import ButtonIcon from '../../base/ui/button/ButtonIcon';
import { AppSizes, AppColors } from '@theme';

class CreateEditProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: !!props.product,
    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------
  onClickEditDone() {
    const product = {
      id: this.props.product.id,
      title: this.title.getTextInputValue(),
      description: this.description.getTextInputValue(),
      price: this.price.getTextInputValue(),
      quantity: this.quantity.getTextInputValue()
    }
    Progress.show(API.updateProduct, [product], res => {
      Alert.alert(Messages.success, res.data.responseData)
    })
  }


  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    const { product } = this.props;
    const { isEditMode } = this.state;
    return <View style={styles.container}>
      <NavBar title={Messages.home.product}
        leftButtonAction={() => Actions.pop()}
        rightView={<View style={{ flexDirection: 'row' }}>
          <ButtonIcon
            iconName={'done'}
            iconColor={AppColors.iconColor}
            iconSize={AppSizes.iconSize}
            action={() => this.onClickEditDone()}
          />
        </View>} />

      {/* <View style={styles.containerImage}>
        <WebImage
          source={{ uri: product.avatar_url }}
          resizeMode='cover'
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </View> */}
      <InputField
        ref={(ref) => { this.title = ref }}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.product.title}
        hintContent={Messages.product.title}
        editable={true}
        content={isEditMode ? product.title : ''}
      />
      <Line />
      <InputField
        ref={(ref) => { this.description = ref }}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.product.description}
        hintContent={Messages.product.description}
        editable={true}
        content={isEditMode ? product.description : ''}
      />
      <Line />
      <InputField
        ref={(ref) => { this.price = ref }}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
          keyboardType: 'numeric'
        }}
        title={Messages.product.price}
        hintContent={Messages.product.price}
        editable={this.state.isEditMode}
        content={isEditMode ? product.price : ''}
      />
      <Line />
      <InputField
        ref={(ref) => { this.quantity = ref }}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
          keyboardType: 'numeric'
        }}
        title={Messages.product.quantity}
        hintContent={Messages.product.quantity}
        editable={true}
        content={isEditMode ? product.quantity : ''}
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditProductScreen);

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