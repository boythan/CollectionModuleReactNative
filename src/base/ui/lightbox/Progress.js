import React, { Component, PropTypes } from 'react';
import { Actions, Overlay } from 'react-native-router-flux';
import { InteractionManager, TouchableOpacity, PixelRatio, Dimensions, Platform, TouchableWithoutFeedback, TouchableNativeFeedback, Animated, Easing, StyleSheet, Image, View, Text, Button, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { AppStyles, AppSizes, AppColors } from '@theme'
import  Messages from '../../../constant/message'
import Spinner from 'react-native-spinkit';
// import { ErrorHandler } from '@error';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');

const DefaultConfig = {
  maxWidthPercentage: 0.8,
  maxHeightPercentage: 0.8,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    width: Math.min(AppSizes.screen.width, AppSizes.screen.height) * DefaultConfig.maxWidthPercentage,
    maxHeight: height * DefaultConfig.maxHeightPercentage,
    borderRadius: 5,
    borderWidth: 0,
  },
  title: {
    ...AppStyles.h3,
    alignSelf: 'stretch',
    textAlign: 'center',
    margin: AppSizes.paddingSml,
    color: AppColors.textTitle,
  },
  textContent: {
    ...AppStyles.h4,
    padding: AppSizes.paddingMedium,
    color: AppColors.textContent,
    textAlign: 'center',
  },
  divider: {
    backgroundColor: AppColors.divider,
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
  },
  buttonText: {
    ...AppStyles.h4,
    textAlign: 'center',
    padding: AppSizes.paddingSml,
    backgroundColor: 'transparent',
    color: AppColors.cerulean,
  },
  buttonStyle: {
    flex: 1
  }
});

class Progress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    };
  }

  render() {
    return (
      /** Dim background and handle touch outside */
      <View style={styles.container}>
        {!this.state.error &&
          <Spinner style={AppStyles.emptyView.progress} size={40} type={'ThreeBounce'} color={AppColors.green} />}
        {this.state.error &&

          <View style={styles.dialog}>

            <Text style={styles.title}>{Messages.error}</Text>
            <Text style={styles.textContent}>{'Error!'}</Text>

            {this.renderHorizontalDivider()}
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.retry()}>
                <Text style={styles.buttonText}>{Messages.retry}</Text>
              </TouchableOpacity>
              {this.renderVerticalDivider()}
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.cancel()}>
                <Text style={styles.buttonText}>{Messages.cancel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    );
  }

  doTask() {
    this.setState({ error: null }, () => {
      let task;
      if (!_.isArray(this.props.args))
        task = this.props.promiseFunction(this.props.args);
      else task = this.props.promiseFunction(...this.props.args);
      task
        .then(result => {
          // call server and receive response with known exception
          if (result.request && result.data
            && result.data.responseData && result.data.responseData.error) {
            this.setError(result.data.responseData.error);
            return;
          }

          // in create Transport preset server return status 200 and error in result.data
          if (result.request && result.data && result.data.error) {
            this.setError(result.data.error);
            return;
          }
          // Success
          this.dismiss();
          if (this.props.onSuccess) {
            this.props.onSuccess(result);
          }
        })
        .catch(error => {
          if (this.unmounted) {
            throw error;
          }
          this.setError(error);
        });
    })
  }

  setError(error) {
    if (this.props.handleError && this.props.handleError(error)) {
      this.dismiss();
      return;
    }
    this.setState({ error });
  }

  renderHorizontalDivider() {
    return (<View style={[styles.divider, { height: 1, }]} />);
  }

  renderVerticalDivider() {
    return (<View style={[styles.divider, { width: 1, }]} />);
  }

  retry() {
    this.doTask();
  }

  cancel() {
    this.dismiss();
    if (this.props.onError) {
      this.props.onError(this.state.error);
    }
  }

  dismiss() {
    Actions.pop();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.doTask();
      Keyboard.dismiss();
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  static show(promiseFunction, args, onSuccess, onError, handleError) {
    if (!_.isFunction(promiseFunction)) throw new Error('Progress.show: First param must be a function');
    Actions.progress({ promiseFunction, args, onSuccess, onError, handleError });
  }
}
export default Progress;