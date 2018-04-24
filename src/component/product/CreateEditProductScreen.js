
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';


import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import { NavBar, WebImage } from '@base'
import { InputField, Line, Progress, MediaListView } from '../../base';
import ButtonIcon from '../../base/ui/button/ButtonIcon';
import { AppSizes, AppColors } from '@theme';
import * as ActionsRefresh from '@redux/refresh/actions'
import EventsType from '@redux/refresh/eventsType';
import _ from 'lodash'

class CreateEditProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: !!props.product,
      productImage: props.productImages ? props.productImages : []

    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------
  onClickDone() {
    const { isEditMode } = this.state;
    let product = {
      title: this.title.getTextInputValue(),
      description: this.description.getTextInputValue(),
      price: this.price.getTextInputValue(),
      quantity: this.quantity.getTextInputValue()
    }
    if (isEditMode) {
      product.id = this.props.product.id
    }
    if (this.state.isEditMode) {
      Progress.show(API.updateProduct, [product], res => {
        if (res.data) {
          this.doSuccessEdit(res);
        }
      })
    } else {
      Progress.show(API.createProduct, [product], res => {
        if (res.data) {
          this.doSuccessEdit(res);
        }
      })
    }


  }

  doSuccessEdit(res) {
    this.props.refresh(EventsType.REFRESH_PRODUCT, _.now());
    Alert.alert(Messages.success, '',
      [
        {
          text: Messages.ok, onPress: () => {
            Actions.pop();
            if (this.state.isEditMode) {
              Actions.refresh({ product: res.data })
            }
          }
        },
      ],
    );
  }

  imageSelected(item, index) {

  }

  clickAddMoreMedia() {
    Actions.camera({ callback: this.callBackCamera.bind(this) })
  }

  callBackCamera(data) {
    let medias = this.state.productImage;
    medias.push(data);
    this.setState({ productImage: medias }, () => {
      this.uploadImage(data)
    });
    console.log(data)
  }

  uploadImage(data) {
    // Progress.show(API.uploadImage, [data.uri], res => {
    //   console.log(res);
    // })
    API.uploadImage(data).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
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
            action={() => this.onClickDone()}
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
        editable={true}
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
      <Text style={styles.textInput}>{Messages.product.attachment}</Text>

      <MediaListView
        data={this.state.productImage}
        didSelect={(item, index) => this.imageSelected(item, index)}
        enableAddMore={true}
        onClickAdd={() => { this.clickAddMoreMedia() }}
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
  refresh: ActionsRefresh.refresh
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