
import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Keyboard, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Messages from '../../constant/message';


import { Actions } from 'react-native-router-flux';
import API from '../../network/API';
import { NavBar, ButtonIcon, Progress } from '@base'
import { InputField } from '../../base';

import * as ActionsRefresh from '@redux/refresh/actions'
import EventsType from '@redux/refresh/eventsType';
import _ from 'lodash'

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------
  onClickEdit() {
    Actions.createEditOrder({ order: this.props.order });
  }

  onClickDeleteProduct() {
    Progress.show(API.deleteOrder, this.props.order.id, res => {
      if (res.data) {
        this.onDeleteSuccess();
      }
    })
  }

  onDeleteSuccess() {
    this.props.refresh(EventsType.REFRESH_ORDER, _.now());
    Alert.alert(Messages.success, '', [
      {
        text: Messages.ok, onPress: () => {
          Actions.pop()
        }
      },
    ])
  }
  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    const { order } = this.props;
    return <View style={styles.container}>
      <NavBar title={Messages.home.order}
        rightView={<View flexDirection={'row'}>
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
        </View>}
        leftButtonAction={() => Actions.pop()} />
      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.order.note}
        editable={false}
        content={order.note}
      />
      <InputField
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.order.total}
        editable={false}
        content={order.total}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  textInput: {
    backgroundColor: 'white',
  },
});