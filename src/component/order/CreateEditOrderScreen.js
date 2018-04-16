
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
import * as ActionsRefresh from '@redux/refresh/actions'
import EventsType from '@redux/refresh/eventsType';
import _ from 'lodash'

class CreateEditOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: !!props.order,
    };
  }

  //UI CONTROL ---------------------------------------------------------------------------------
  onClickDone() {
    const { isEditMode } = this.state;
    let order = {
      note: this.note.getTextInputValue(),
      total: this.total.getTextInputValue(),
    }
    if(isEditMode){
      order.id = this.props.order.id;
      order.customerId = this.props.order.customerId;
    }
    if (this.state.isEditMode) {
      Progress.show(API.updateOrder, [order], res => {
        if (res.data) {
          this.doSuccessEdit(res);
        }
      })
    } else {
      Progress.show(API.createOrder, [order], res => {
        if (res.data) {
          this.doSuccessEdit(res);
        }
      })
    }


  }

  doSuccessEdit(res) {
    this.props.refresh(EventsType.REFRESH_ORDER, _.now());
    Alert.alert(Messages.success, '',
      [
        {
          text: Messages.ok, onPress: () => {
            Actions.pop();

            if (this.state.isEditMode) {
              Actions.refresh({ order: res.data })
            }
          }
        },
      ],
    );
  }
  //UI RENDER ----------------------------------------------------------------------------------
  render() {
    const { order } = this.props;
    const { isEditMode } = this.state;
    return <View style={styles.container}>
      <NavBar title={Messages.home.order}
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
        ref={(ref) => { this.note = ref }}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.order.note}
        hintContent={Messages.order.note}
        editable={true}
        content={isEditMode ? order.note : ''}
      />
      <Line />
      <InputField
        ref={(ref) => { this.total = ref }}
        containerStyle={styles.textInput}
        contentInputProps={{
          multiline: true,
        }}
        title={Messages.order.total}
        hintContent={Messages.order.total}
        editable={true}
        content={isEditMode ? order.total : ''}
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditOrderScreen);

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