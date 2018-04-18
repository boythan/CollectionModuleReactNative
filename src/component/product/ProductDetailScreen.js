
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
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


class ProductDetailScreen extends ScrollableTabScreen {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      productImage: []
    };
  }

  componentDidMount() {

    this.getImageList();

  }

  getImageList() {
    API.getProductImages(this.props.product.id).then(res => {
      if (res.data) {
        this.setState({ productImage: res.data }, () => {
          this._calculateTabs();
        })
      }
    })
  }
  //UI CONTROL ---------------------------------------------------------------------------------
  onClickEdit() {
    Actions.createEditProduct({ product: this.props.product });
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

  handleTabChanged = (index) => {
    this.handleIndexChange(index);
  }

  tabs = () => {
    if (_.isEmpty(this.state.productImage)) return Promise.resolve([]);
    let contentViews = _.map(this.state.productImage, (item, index) => {
      return { component: ViewMediaDetailScreen, title: item.id ? item.id.toString() : uuidV4(), props: { data: item, pageIndex: index } }
    });
    return Promise.resolve(contentViews)
  }

  //UI RENDER ----------------------------------------------------------------------------------

  renderHeader = () => {
    return (
      <View />
    )
  }


  render() {
    const { product } = this.props;
    return <View style={styles.container}>
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


      <TabViewAnimated
        style={styles.containerImage}
        navigationState={this.state.navigation}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleTabChanged}
        lazy={true}
      />

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
      <Line />
      {/* <MediaListView
        data={this.state.productImage}
        didSelect={this.imageSelected}
      /> */}
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
    height: 200,
  },
  textInput: {
    backgroundColor: 'white',
  },
  item: {
    width: '100%',
    height: 200,
  }
});


class ViewMediaDetailScreen extends Component {
  render() {
    return (<TouchableOpacity activeOpacity={1} style={styles.item} onPress={() => {

    }}>
      <WebImage
        containerStyle={{ position: 'absolute',width: '100%', height: '100%' }}
        source={{ uri: this.props.data.url }}
      />
    </TouchableOpacity>)
  }
}