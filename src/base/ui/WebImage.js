import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AppColors, AppSizes } from '@theme';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({

  photo: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
  },
  placeHolder: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  spinner: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center'
  },
});
export default class WebImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      isLoadFromBackupSource: false,
      isBuffering: true,
    };
  }

  static PropTypes = {
    source: PropTypes.any.isRequired,
    backupSource: PropTypes.any,
    placeHolder: PropTypes.object,
    resizeMode: PropTypes.string,
    style: PropTypes.object,
    indicator: PropTypes.object,
    size: PropTypes.number,
    rounded: PropTypes.bool,
    containerStyle: PropTypes.object,
  }

  static defaultProps = {
    size: 24,
    rounded: false,
    resizeMode: 'stretch',
  }

  onLoadError = () => {
    if (this.props.backupSource && !this.state.isLoadFromBackupSource) {
      this.setState({ isLoadFromBackupSource: true, source: this.props.backupSource });
    }
  }

  onLoadSuccess = () => {
    this.setState({ isLoadFromBackupSource: false });
  }

  getSource = (sourceImage) => {
    if (sourceImage && sourceImage.uri && sourceImage.uri.toString().trim()) {
      return sourceImage;
    }
    //use backup Url if source is null
    if (this.props.backupSource) {
      return this.props.backupSource;
    }
    return this.props.placeHolder;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.source && this.props.source != nextProps.source) {
      this.setState({ source: nextProps.source });
    }
  }
  render() {
    const {
      placeHolder,
      resizeMode,
      rounded,
      size,
      containerStyle,
      style,
    } = this.props;

    borderRadius = rounded ? { borderRadius: size / 2 } : { borderRadius: 0 };

    //fix issue android not circle with borderRadius. Fix: android circle when resizeMode='cover'
    //https://medium.com/the-react-native-log/tips-for-react-native-images-or-saying-goodbye-to-trial-and-error-b2baaf0a1a4d
    imageMode = rounded ? 'cover' : resizeMode;

    container = { width: size, height: size, backgroundColor: 'transparent' };
    return (
      <View style={[{ ...container }, containerStyle && containerStyle, { justifyContent: 'center' }]}>
        <Image
          style={[styles.photo, { ...borderRadius }, style && style]}
          source={this.getSource(this.state.source)} resizeMode={imageMode}
          onError={this.onLoadError}
          onLoad={this.onLoadSuccess} />
        
        <Image style={[styles.placeHolder, { ...borderRadius }, style && style]} source={placeHolder} resizeMode={imageMode}></Image>
        {/* <Spinner style={styles.spinner} size={20} type={'Circle'} color={AppColors.green} isVisible={this.state.isBuffering} /> */}
      </View>
    );
  }
}