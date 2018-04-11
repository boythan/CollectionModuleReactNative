import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard, Button, Text } from 'react-native';
import { AppStyles, AppColors, AppSizes } from '@theme';
import PropTypes from 'prop-types';

class ButtonText extends Component {

  static propsType = {
    enable: PropTypes.bool,
    content: PropTypes.string,
    onClick: PropTypes.func,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    textStyleDisable: PropTypes.object,
  }

  static defaultProps = {
    enable: true,
    content: 'Done',
    onClick: () => {
      console.log('ButtonText Clicked');
    },
    buttonStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
    },
  }

  onClick = () => {
    this.props.onClick();
    Keyboard.dismiss();
  }
  render() {
    const {
      containerStyle,
      enable,
      content,
      onClick,
      buttonStyle,
      textStyle,
      textStyleDisable,
    } = this.props;
    const styleText = [
      styles.text,
      enable ? styles.enable : styles.disabled,
      enable ? textStyle : textStyleDisable];
    // const styleDisable = [styles.text, styles.disabled, textStyleDisable];
    return (
      <TouchableOpacity keyboardShouldPersistTaps='always' disabled={!enable} onPress={onClick ? _.throttle(this.onClick, 2000, { 'trailing': false }) : null}>
        <View style={[styles.containerStyle, containerStyle && containerStyle]}>
          <Text style={styleText}>{content}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: AppSizes.buttonSizeBase,
    height: AppSizes.buttonSizeBase,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...AppStyles.baseText,
    textAlign: 'center',
  },
  enable: {
    color: AppColors.white,
  },
  disabled: {
    color: 'rgba(250, 250, 250, 0.5)',
  }
})

export default ButtonText;