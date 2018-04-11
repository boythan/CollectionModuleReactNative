import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import _ from 'lodash';

const ViewPropTypes = View.propTypes;

class ButtonIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    containerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    isIcon: PropTypes.bool,
    source: PropTypes.number,
    type: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    action: PropTypes.func,
  };

  static defaultProps = {
    type: 'material',
    iconSize: 20
  }

  render() {
    const {
      containerStyle,
      style,
      isIcon,
      source,
      type,
      iconName,
      iconColor,
      iconSize,
      action,
      haveAlpha,
      disablethrottle,
    } = this.props;

    return (
      <TouchableOpacity
        disabled={isIcon}
        onPress={action ? (disablethrottle ? action : _.throttle(action, 200, { 'trailing': false })) : null}>
        <View style={[styles.container, containerStyle && containerStyle]}>
          {
            source
              ?
              <ImageBackground
                style={[styles.icon, style && style]}
                source={source}
                resizeMode='contain'>
                {haveAlpha && <View
                  style={{ backgroundColor: 'rgba(255,255,255,0.3)', flex: 1 }} />}
              </ImageBackground>
              :
              <Icon
                style={style && style}
                type={type}
                name={iconName}
                color={iconColor}
                size={iconSize} />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '60%',
    height: '60%'
  },
})

export default ButtonIcon;