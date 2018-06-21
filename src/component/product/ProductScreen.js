
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';
import { Line, NavBar, WebImage, ButtonIcon } from '@base'

import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import ListComponent from '../../base/collection/ListComponent'
import EmptyView from '../../base/collection/EmptyView'
import PagingView from '../../base/collection/PagingView'
import EventsType from '@redux/refresh/eventsType';
import PagingListComponent from '../../base/collection/PagingListComponent';
import ProductItem from './ProductItem';

class ProductScreen extends PagingListComponent {
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
    return API.getProducts(pagingData);
  }

  onClickProductItem(product) {

  }

  keyExtractor = (item, index) => {
    if (!item.id) {
      return index.toString();
    }
    return item.id
  }

  transformer(res) {
    return res.data.products;
  }

  //UI RENDER ----------------------------------------------------------------------------------
  renderItem(item) {
    const product = item.item;
    return (
      <ProductItem
        product={product}
        onPress={() => { this.onClickProductItem(product) }}
      />)
  }


  render() {
    return <View style={styles.container}>
      <NavBar title={Messages.home.product}
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