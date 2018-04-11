import React, { Component, PropTypes, } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList, } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { AppStyles, AppColors, AppSizes, } from '@theme';
import { Line, } from '@component';
import { Messages, } from '@constant';

import { Icon } from 'react-native-elements'

const DEFAULT_ICON_TYPE = 'material';

export default class ActionSheetView extends Component {
  static propTypes = {
    actions: PropTypes.array,
    onCancel: PropTypes.func,
  };

  keyExtractor = (item, index) => {
    if (!_.isEmpty(item.id)) {
      return index.toString();
    }
    return item.id
  }

  renderHeader() {
    return (
      this.props.title ?
      <View>
        <View style={styles.titleContainer}>
          <Text style={{ ...AppStyles.baseText, color: AppColors.white }}>{this.props.title}</Text>
        </View>
        {this.renderSeperator()}
      </View>
      :
      <View />
    );
  }

  renderFooter() {
    return (
      <View>
        {this.renderSeperator()}
        <TouchableOpacity onPress={() => this.props.onCancel()}>
          <View style={styles.buttonContainer}>
            <Icon style={styles.buttonVector} name='close' color={this.props.cancelColor} size={16} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.buttonTitle, { color: 'white' }]}>{Messages.cancel}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity style={[styles.buttonContainer, { flex: 1 }]} onPress={() => this.onClickActionItem(item)}>
        {
          item.icon && <Image style={styles.buttonIcon} source={item.icon} resizeMode='contain' />
          ||
          item.iconName && <Icon style={styles.buttonVector} type={item.iconType ? item.iconType : DEFAULT_ICON_TYPE} name={item.iconName} color={AppColors.white} size={16} />
        }
        <View style={{ flex: 1 }}>
          <Text style={[styles.buttonTitle, { color: AppColors.white }]}>{item.title}</Text>
        </View>
        {item.selected &&
          <Image style={styles.buttonChecked} source={require('@images/ic_check_box_checked.png')} resizeMode='contain' />}
      </TouchableOpacity>
    );
  }

  renderSeperator() {
    return (
      <Line color='rgba(0, 0, 0, 0.2)' />
    );
  }

  onClickActionItem = (item) => {
    this.props.onCancel && this.props.onCancel();
    this.props.didSelectItem && this.props.didSelectItem(item);
  }

  render() {
    return (
      <FlatList
        scrollEnabled={false}
        style={{ backgroundColor: 'transparent' }}
        renderItem={(item) => this.renderItem(item)}
        keyExtractor={this.keyExtractor}
        data={this.props.actions}
        ListHeaderComponent={() => this.renderHeader()}
        ListFooterComponent={() => this.renderFooter()}
        ItemSeparatorComponent={() => this.renderSeperator()}
      />
    );
  }
}

// component's styles
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  buttonIcon: {
    width: 16,
    height: 16,
    marginLeft: AppSizes.margin
  },
  buttonVector: {
    marginLeft: AppSizes.margin
  },
  buttonTitle: {
    ...AppStyles.h3,
    alignSelf: 'stretch',
    marginLeft: AppSizes.margin,
    fontSize: AppSizes.fontBase,
    color: AppColors.white,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  buttonChecked: {
    width: 16,
    height: 16,
    marginRight: AppSizes.margin,
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});