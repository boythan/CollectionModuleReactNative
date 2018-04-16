
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';
import { Line, NavBar, ButtonIcon } from '@base'

import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import ListComponent from '../../base/collection/ListComponent'
import EmptyView from '../../base/collection/EmptyView'
import PagingView from '../../base/collection/PagingView'
import EventsType from '@redux/refresh/eventsType';

class OrderScreen extends ListComponent {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    // check and refresh list
    if (nextProps && nextProps.event && nextProps.event.types == EventsType.REFRESH_ORDER) {
      if (!this.props.event || this.props.event.timeUnix != nextProps.event.timeUnix) {
        this.refresh();
      }
    }
  }
  //UI CONTROL ---------------------------------------------------------------------------------
  source = (pagingData) => {
    return API.getOrders();
  }


  renderItem(order) {
    return (
      <TouchableOpacity style={{ padding: 5 }} onPress={() => Actions.orderDetail({ order })}>
        <Text style={styles.itemText}>{order.note}</Text>
        <Text style={styles.itemText}>{order.total}</Text>
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
    Actions.createEditOrder();
  }
  //UI RENDER ----------------------------------------------------------------------------------
  render() {

    return <View style={styles.container}>
      <NavBar title={Messages.home.order}
        rightView={<ButtonIcon
          iconName={'add'}
          iconColor={AppColors.iconColor}
          iconSize={AppSizes.iconSize}
          action={() => this.onClickAdd()}
        />}
        leftButtonAction={() => Actions.pop()} />
      <FlatList
        style={styles.orderList}
        renderItem={(item) => this.renderItem(item.item)}
        keyExtractor={item => item.id}
        refreshing={this.state.refreshing}
        data={this.state.data}
        onRefresh={() => this.onRefresh()}
        onEndReached={() => this.onEndReached()}
        ListFooterComponent={() => (<PagingView mode={this.state.pagingMode} retry={() => this.start()} />)}
        ItemSeparatorComponent={Line}
      />
      <Line />
      <EmptyView mode={this.state.emptyMode} retry={() => this.start()} emptyText={Messages.emptyView.emptyOrder} />
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    width: '100%',
    padding: 5
  },
  orderList: {
    width: '100%',
    height: '100%'
  }
});