
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';
import { Line, NavBar } from '@base'

import { Actions } from 'react-native-router-flux';
import * as PositionsActions from '../../redux/action';
import API from '../../network/API';
import ListComponent from '../../base/collection/ListComponent'
import EmptyView from '../../base/collection/EmptyView'
import PagingView from '../../base/collection/PagingView'

class OrderScreen extends ListComponent {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.start();
  }
  //UI CONTROL ---------------------------------------------------------------------------------
  source = (pagingData) => {
    return API.getUsers();
  }


  renderItem(user) {
    return (
      <TouchableOpacity onPress={() => Actions.orderDetail({ order: user.item })}>
        <Text style={styles.itemText}>{user.item.login}</Text>
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

  //UI RENDER ----------------------------------------------------------------------------------
  render() {

    return <View style={styles.container}>
      <NavBar title={Messages.home.order}
        leftButtonAction={() => Actions.pop()} />
      <FlatList
        style={styles.orderList}
        renderItem={(item) => this.renderItem(item)}
        keyExtractor={item => item.id}
        refreshing={this.state.refreshing}
        data={this.state.data}
        onRefresh={() => this.onRefresh()}
        onEndReached={() => this.onEndReached()}
        ListFooterComponent={() => (<PagingView mode={this.state.pagingMode} retry={() => this.start()} />)}
        ItemSeparatorComponent={Line}
      />
      <EmptyView mode={this.state.emptyMode} retry={() => this.start()} emptyText={Messages.emptyView.emptyOrder} />
    </View>


  }
};

// Redux
const mapStateToProps = state => ({

})

// Any actions to map to the component?
const mapDispatchToProps = {
  positionAction: PositionsActions.position
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
    color: 'red',
    width: '100%',
    padding: 5
  },
  orderList: {
    width: '100%'
  }
});