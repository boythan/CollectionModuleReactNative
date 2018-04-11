import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import { AppStyles, AppFonts, AppColors } from '@theme'
import ButtonIcon from '../ui/button/ButtonIcon';
import ButtonText from '../ui/button/ButtonText';

import { DeviceUtil } from '@utils';
import _ from 'lodash';

const wrapNavBarDimen = Platform.OS === 'ios' ? 44 : 55;

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: AppColors.navbar.background,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: wrapNavBarDimen,
      },
    }),
    // height: 62,
    flexDirection: 'row',
    width: '100%',
    ...Platform.select({
      android: {
        alignItems: 'center',
      },
    }),
  },
  wrapContainer: {
    flex: 1,
    height: wrapNavBarDimen,
    ...Platform.select({
      ios: {
        top: 20,
      },
    }),
  },
  backButton: {
    width: wrapNavBarDimen,
    height: wrapNavBarDimen,
  },
  rightButton: {
    width: wrapNavBarDimen,
    height: wrapNavBarDimen,
  },
  title: {
    fontFamily: AppFonts.base.family,
    fontSize: 15,
    backgroundColor: 'transparent',
    color: 'white',
    width: '50%',
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  rightView: {
    flexDirection: 'row',
    height: wrapNavBarDimen,
    position: 'absolute',
    right: 4,
    alignItems: 'center'
  },
})

export default class NavBar extends Component {
  render() {
    const _titleStyle = {};
    const _titleContainerStyle = {};

    if (this.props.left) {
      _titleContainerStyle.alignItems = 'flex-start';
      _titleStyle.textAlign = 'left';
      _titleStyle.marginLeft = 40;
    }

    const { rightView,
      contentView,
      title,
      rightButtonTitle,
      rightButtonEnable,
      rightButtonAction,
      leftButtonAction,
      isHideLeftButton,
      customTitleStyle,
    } = this.props

    const iphoneXCustomHeight = DeviceUtil.isIPhoneX() ? { ...AppStyles.ipXNavBarHeight } : {}
    const iphoneXCustomTop = DeviceUtil.isIPhoneX() ? { ...AppStyles.ipXNavBarTop } : {}
    return (
      <View style={[styles.navigationBar, iphoneXCustomHeight]}>
        <View flexDirection='row' style={[styles.wrapContainer, iphoneXCustomTop]}>
          <View style={[styles.titleContainer, _titleContainerStyle]}>
            {contentView ? contentView : <Text numberOfLines={1} style={[styles.title, _titleStyle, customTitleStyle]}>{title}</Text>}
          </View>
          {!isHideLeftButton && <ButtonIcon containerStyle={styles.backButton} iconName='arrow-back' iconSize={24} iconColor={'white'} action={() => {
            if (leftButtonAction) {
              leftButtonAction();
            } else {
              Actions.pop();
            }
          }} />}
          <View style={styles.rightView}>
            {rightView && rightView}
            {rightButtonTitle && <ButtonText
              containerStyle={styles.rightButton}
              enable={rightButtonEnable}
              content={rightButtonTitle} onClick={() => {
                rightButtonAction && rightButtonAction()
              }} />}
          </View>
        </View>
      </View>
    )
  }
}