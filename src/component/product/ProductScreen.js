
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';
import { Line, NavBar, WebImage , ButtonIcon} from '@base'

import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import ListComponent from '../../base/collection/ListComponent'
import EmptyView from '../../base/collection/EmptyView'
import PagingView from '../../base/collection/PagingView'
import EventsType from '@redux/refresh/eventsType';

class ProductScreen extends ListComponent {
  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    // check and refresh list
    if (nextProps && nextProps.event && nextProps.event.types == EventsType.REFRESH_PRODUCT) {
      if (!this.props.event || this.props.event.timeUnix != nextProps.event.timeUnix) {
        this.refresh();
      }
    }
  }
  componentDidMount() {
    this.start();
  }
  //UI CONTROL ---------------------------------------------------------------------------------
  source = (pagingData) => {
    return API.getProducts();
  }


  renderItem(item) {
    const product = item.item;
    return (
      <TouchableOpacity style={styles.containerCell} onPress={() => Actions.productDetail({ product })}>
        <WebImage
          rounded
          size={30}
          source={{ uri: product.avatar_url }}
          resizeMode='cover' />
        <View style={{ width: AppSizes.screen.width - 40 }}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.itemText}>{product.title}</Text>
            <Text style={styles.itemText}>{product.price}</Text>
          </View>
          <Text style={styles.itemText}>{product.description}</Text>

        </View>
      </TouchableOpacity>)
  }

  keyExtractor = (item, index) => {
    if (!item.id) {
      return index.toString();
    }
    return item.id
  }

  transformer(res) {
    return res.data;
  }

  onClickAdd() {
    Actions.createEditProduct();
  }

  //UI RENDER ----------------------------------------------------------------------------------
  render() {

    return <View style={styles.container}>
      <NavBar title={Messages.home.product}
        rightView={<ButtonIcon
          iconName={'add'}
          iconColor={AppColors.iconColor}
          iconSize={AppSizes.iconSize}
          action={() => this.onClickAdd()}
        />}
        leftButtonAction={() => Actions.pop()} />
      <FlatList
        style={styles.productList}
        renderItem={(item) => this.renderItem(item)}
        keyExtractor={item => item.id}
        refreshing={this.state.refreshing}
        data={this.state.data}
        onRefresh={() => this.onRefresh()}
        onEndReached={() => this.onEndReached()}
        ListFooterComponent={() => (<PagingView mode={this.state.pagingMode} retry={() => this.start()} />)}
        ItemSeparatorComponent={Line}
      />
      <EmptyView mode={this.state.emptyMode} retry={() => this.start()} emptyText={Messages.emptyView.emptyProduct} />
    </View>


  }
};

// Redux
const mapStateToProps = state => ({
  event: state.refresh.event,
})

// Any actions to map to the component?
const mapDispatchToProps = {
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    padding: 5
  },
  productList: {
    width: '100%'
  },
  containerCell: {
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});