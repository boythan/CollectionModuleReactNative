
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';


import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import { NavBar, WebImage, Progress, MediaListView } from '@base'
import { InputField, Line, ScrollableTabScreen } from '../../base';
import ButtonIcon from '../../base/ui/button/ButtonIcon';
import { AppSizes, AppColors } from '@theme';
import * as ActionsRefresh from '@redux/refresh/actions'
import EventsType from '@redux/refresh/eventsType';
import _ from 'lodash';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const initialLayout = {
  height: 0,
  width: AppSizes.screenWidth,
};

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      productImage:  []
    };
  }

  componentDidMount() {
    this.getImageList();
  }

  getImageList() {
    API.getProductImages(this.props.product.id).then(res => {
      if (res.data) {
        this.setState({ productImage: res.data })
      }
    })
  }
  //UI CONTROL ---------------------------------------------------------------------------------
  onClickEdit() {
    Actions.createEditProduct({ product: this.props.product, productImages: this.state.productImage });
  }

  onClickDeleteProduct() {
    Progress.show(API.deleteProduct, this.props.product.id, res => {
      if (res.data) {
        this.onDeleteSuccess();
      }
    })
  }
  onDeleteSuccess() {
    this.props.refresh(EventsType.REFRESH_PRODUCT, _.now());
    Alert.alert(Messages.success, '', [
      {
        text: Messages.ok, onPress: () => {
          Actions.pop();
        }
      },
    ])
  }

  imageSelected(item, index) {
    console.log(item);
  }
  //UI RENDER ----------------------------------------------------------------------------------

  render() {
    const { product } = this.props;
    return <ScrollView style={styles.container} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <NavBar title={Messages.home.product}
        leftButtonAction={() => Actions.pop()}
        rightView={<View style={{ flexDirection: 'row' }}>
          <ButtonIcon
            iconName={'mode-edit'}
            iconColor={AppColors.iconColor}
            iconSize={AppSizes.iconSize}
            action={() => this.onClickEdit()}
          />
          <ButtonIcon
            iconName={'delete'}
            iconColor={AppColors.iconColor}
            iconSize={AppSizes.iconSize}
            action={() => this.onClickDeleteProduct()}
          />
        </View>} />

      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.product.title}
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
          keyboardType: 'numeric'
        }}
        title={Messages.product.price}
        editable={false}
        content={product.price}
      />
      <Line />
      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
          keyboardType: 'numeric'
        }}
        title={Messages.product.quantity}
        editable={false}
        content={product.quantity}
      />
      <Line style={{ marginBottom: 20 }} />
      <Text style= {styles.textInput}>{Messages.product.attachment}</Text>
      <MediaListView
        data={this.state.productImage}
        didSelect={(item, index) => this.imageSelected(item, index)}
      />
      <Line />
    </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  containerImage: {
    // width: '100%',
    // height: '30%',
  },
  textInput: {
    backgroundColor: 'white',
  },
  item: {
    width: '100%',
    height: 200,
  }
});