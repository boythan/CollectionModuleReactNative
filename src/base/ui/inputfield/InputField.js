import { Platform, View, StyleSheet, TouchableNativeFeedback, TouchableOpacity, TextInput, Image, Keyboard, Text } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppFonts from '../../../theme/fonts';
import AppStyles from '../../../theme/styles';
import AppColors from '../../../theme/colors';
import AppSizes from '../../../theme/sizes';
import _ from 'lodash';

const STYLE = 'style';
const HALF = 'half';
const MULTILINE = 'multiline';
const COLUMNS = 'columns';
const ViewPropTypes = View.propTypes;
class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textContent: props.content + '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content != nextProps.content) {
      this.setState({ textContent: nextProps.content });
    }
  }

  static propTypes = {
    columns: PropTypes.number,
    containerStyle: ViewPropTypes.style,
    error: PropTypes.bool,
    showIcon: PropTypes.bool,
    onPress: PropTypes.any,
    clickable: PropTypes.bool,

    titleProps: PropTypes.any,
    title: PropTypes.string,

    editable: PropTypes.bool,
    contentProps: PropTypes.any,
    contentInputProps: PropTypes.any,
    content: PropTypes.string,
    hintContent: PropTypes.string,
  };

  static defaultProps = {
    titleColor: AppColors.textTitle,
    contentColor: AppColors.textContent,
    clickable: true,
  }

  getIcon = () => {
    if (this.props.error) {
      return errorIcon;
    } else {
      return arrowIcon;
    }
  }

  getTextTitleColor = () => {
    if (this.props.error) {
      return errorColor;
    } else {
      return this.props.titleColor || InputField.defaultProps.titleColor;
    }
  }

  getTextContentColor = () => {
    if (this.props.error) {
      return errorColor;
    } else {
      return this.props.contentColor || InputField.defaultProps.contentColor;
    }
  }

  getTextInputValue = () => {
    return this.state.textContent;
  }

  onChangeText(text) {
    this.setState({ textContent: text }, () => {
      if (this.props.onChangeText) {
        this.props.onChangeText(text)
      }
    })
  }

  onContentSizeChange = (height) => {
    this.setState({
      inputHeight: height,
    });
  }

  _renderTitle = () => {
    const {
      titleProps,
      title,
    } = this.props;

    let titleStyle, _titleProps;
    if (titleProps) {
      titleStyle = titleProps[STYLE];
      _titleProps = _.omit(titleProps, STYLE);
    }

    return (
      <Text
        style={[styles.textTitle, titleStyle && titleStyle, { color: this.getTextTitleColor() }]}
        {...titleProps}>
        {title && title.toString().toUpperCase()}
      </Text>
    )
  }

  _renderContent = () => {
    const {
      editable,
      contentProps,
      contentInputProps,
      content,
      hintContent
    } = this.props;

    let contentStyle, _contentProps;
    let contentInputStyle, _contentInputProps;
    if (contentProps) {
      contentStyle = contentProps[STYLE];
      _contentProps = _.omit(contentProps, STYLE);
    }
    if (contentInputProps) {
      contentInputStyle = contentInputProps[STYLE];
      _contentInputProps = _.omit(contentInputProps, STYLE);
    }

    const osAndroid = Platform.OS === 'android';
    const osIOS = Platform.OS === 'ios';
    let multiline = false;
    if (contentInputProps) {
      multiline = contentInputProps[MULTILINE];
    }
    const androidMultilineStyle = {
      height: this.state.inputHeight,
    }
    let blurOnSubmit = null;
    if (osAndroid) {
      blurOnSubmit = !multiline;
    }
    let paddingVertical = ((osIOS && !multiline) || (osAndroid && multiline)) ? 4 : 0

    return (
      editable ?
        <TextInput
          ref={ref => this.inputContent = ref}
          style={[styles.inputContent, contentInputStyle && contentInputStyle, { color: this.getTextContentColor() }, (osAndroid && multiline) && androidMultilineStyle, { paddingVertical: paddingVertical }]}
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid={AppColors.transparent}
          blurOnSubmit={blurOnSubmit}
          onContentSizeChange={(e) => this.onContentSizeChange(e.nativeEvent.contentSize.height)}
          placeholder={hintContent}
          placeholderTextColor={AppColors.textSecondary}
          onChangeText={(content) => this.onChangeText(content)}
          value={this.state.textContent}
          {..._contentInputProps} />
        :
        <Text
          style={[styles.textContent, contentStyle && contentStyle, { color: content ? this.getTextContentColor() : AppColors.textSecondary }]}
          {..._contentProps}>
          {this.state.textContent && this.state.textContent.toString() || hintContent}
        </Text>
    )
  }

  onPressDefault = () => {
    this.inputContent.focus();
  }

  blur = () => {
    this.inputContent.blur();
  }

  render = () => {
    const {
      columns,
      containerStyle,
      error,
      showIcon,
      onPress,
      clickable,
      editable,
    } = this.props;

    let widthStyle = {};

    if (_.has(this.props, HALF)) {
      widthStyle = { width: AppSizes.screen.width / 2 };
    } else if (_.has(this.props, COLUMNS)) {
      widthStyle = { width: (AppSizes.screen.width - (columns - 1)) / columns };
    }

    const isShowRightIcon = (showIcon || error);
    // () => this.onPressDefault()
    return (

      <TouchableOpacity
        keyboardShouldPersistTaps='always'
        activeOpacity={onPress ? 0.2 : 1}
        onPress={onPress ? _.throttle(onPress, 2000, { 'trailing': false }) : (editable ? _.throttle(this.onPressDefault, 1000, { 'trailing': false }) : null)}>
        <View
          style={[containerStyle && containerStyle, widthStyle]}>
          <View style={styles.container}>
            <View style={[styles.contentContainer, { paddingRight: isShowRightIcon ? iconDimen : 0 }]}>
              {this._renderTitle()}
              {this._renderContent()}
            </View>
            {isShowRightIcon &&
              <Image
                source={this.getIcon()}
                resizeMode='contain'
                style={styles.icon} />}
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const arrowIcon = require('../../../image/ic_list_arrow_right.png');
const errorIcon = require('../../../image/ic_error.png');
const errorColor = AppColors.red;
const iconDimen = 20;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    paddingLeft: AppSizes.paddingSml,
    paddingRight: AppSizes.paddingXXSml,
    paddingTop: AppSizes.paddingSml,
    paddingBottom: AppSizes.paddingXSml,
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-end',
  },
  textTitle: {
    ...AppStyles.boldText,
    color: InputField.defaultProps.titleColor,
    fontSize: AppSizes.fontSmall,
    lineHeight: AppSizes.fontSmall,
    textAlignVertical: 'center',
  },
  textContent: {
    fontFamily: AppFonts.base.family,
    fontSize: AppFonts.base.size,
    color: AppColors.textPrimary,
    padding: 0,
    ...Platform.select({
      ios: {
        paddingVertical: 4
      },
      android: {
        marginTop: 4
      },
    }),
  },
  inputContent: {
    fontFamily: AppFonts.base.family,
    fontSize: AppFonts.base.size,
    color: AppColors.textPrimary,
    padding: 0,
  },
  icon: {
    position: 'absolute',
    width: iconDimen,
    height: iconDimen,
    alignSelf: 'center',
    right: AppSizes.paddingXXSml,
  }
});

export default InputField;
