import React, { Component, PropTypes } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackAndroid as RNBackAndroid,
  BackHandler as RNBackHandler,
} from 'react-native';

import Overlay from './Overlay';
import ActionSheetView from './ActionSheetView';
import SlideAnimation from './animations/SlideAnimation';
import ViewPropTypes from '@component/config/ViewPropTypes';

import { AppStyles, AppColors, AppSizes } from '@theme';

const BackHandler = RNBackHandler || RNBackAndroid;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// action sheet states
const ACTION_SHEET_OPENING = 'opening';
const ACTION_SHEET_OPENED = 'opened';
const ACTION_SHEET_CLOSING = 'closing';
const ACTION_SHEET_CLOSED = 'closed';

// default action sheet config
const DEFAULT_ANIMATION_DURATION = 150;
const DEFAULT_WIDTH = screenWidth;
const DISMISS_ON_TOUCH_OUTSIDE = true;
const DISMISS_ON_HARDWARE_BACK_PRESS = true;
const HAVE_OVERLAY = true;
const DEFAULT_BORDER_RADIUS = 8;
const DEFAULT_MARGIN = 16;

// event types
// only for android
const HARDWARE_BACK_PRESS_EVENT = 'hardwareBackPress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1000,
  },
  actionSheet: {
    borderRadius: 8,
    backgroundColor: AppColors.navbar.background,
    marginBottom: (Platform.OS === 'ios' ? 0 : 26) + DEFAULT_MARGIN,
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});

class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionSheetState: ACTION_SHEET_CLOSED,
    };
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    haveOverlay: PropTypes.bool,
    overlayPointerEvents: PropTypes.string,
    overlayBackgroundColor: PropTypes.string,
    overlayOpacity: PropTypes.number,
    actionSheetAnimation: PropTypes.object,
    actionSheetStyle: PropTypes.any,
    containerStyle: PropTypes.any,
    animationDuration: PropTypes.number,
    dismissOnTouchOutside: PropTypes.bool,
    dismissOnHardwareBackPress: PropTypes.bool,
    show: PropTypes.bool,
    onShown: PropTypes.func,
    onDismissed: PropTypes.func,
    didSelectItem: PropTypes.func,
    actions: PropTypes.array,
    children: PropTypes.any,
    cancelColor: PropTypes.any,
  };

  static defaultProps = {
    cancelColor: 'white',
    containerStyle: null,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    actionSheetAnimation: new SlideAnimation({ slideFrom: 'bottom', animationDuration: DEFAULT_ANIMATION_DURATION }),
    width: DEFAULT_WIDTH,
    dismissOnTouchOutside: DISMISS_ON_TOUCH_OUTSIDE,
    dismissOnHardwareBackPress: DISMISS_ON_HARDWARE_BACK_PRESS,
    haveOverlay: HAVE_OVERLAY,
    onShown: () => { },
    onDismissed: () => { },
    show: false,
  }

  componentDidMount() {
    const { show } = this.props;

    if (show) {
      this.show();
    }

    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackEventHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show();
      } else {
        this.dismiss();
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackEventHandler);
  }

  onOverlayPress = () => {
    const { dismissOnTouchOutside } = this.props;

    if (dismissOnTouchOutside) {
      this.dismiss();
    }
  }

  setActionSheetState(toValue) {
    let actionSheetState = toValue ? ACTION_SHEET_OPENING : ACTION_SHEET_CLOSING;

    // to make sure has passed the actionSheetAnimation prop and the actionSheetAnimation has toValue method
    if (this.props.actionSheetAnimation && this.props.actionSheetAnimation.toValue) {
      this.props.actionSheetAnimation.toValue(toValue);
    }

    this.setState({ actionSheetState });
  }

  onAnimationComplete = () => {
    const { onShown, onDismissed } = this.props;
    let actionSheetState = this.state.actionSheetState === ACTION_SHEET_CLOSING ? ACTION_SHEET_CLOSED : ACTION_SHEET_OPENED;
    let callback = this.state.actionSheetState === ACTION_SHEET_CLOSING ? onDismissed : onShown;
    this.setState({ actionSheetState }, () => callback && callback());
  }

  overlayPointerEvents = () => {
    if (this.props.overlayPointerEvents) {
      return this.props.overlayPointerEvents;
    }
    return this.state.actionSheetState === ACTION_SHEET_OPENED ? 'auto' : 'none';
  }

  actionSheetSize = () => {
    let { width } = this.props;

    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth;
    }

    width -= (DEFAULT_MARGIN * 2);
    // if (height && height > 0.0 && height <= 1.0) {
    //   height *= screenHeight;
    // }

    return { width };
  }

  show() {
    this.setActionSheetState(1);
  }

  dismiss() {
    this.setActionSheetState(0);
  }

  hardwareBackEventHandler = () => {
    const { dismissOnHardwareBackPress } = this.props;
    const { actionSheetState } = this.state;

    if (dismissOnHardwareBackPress && actionSheetState === ACTION_SHEET_OPENED) {
      this.dismiss();
      return true;
    }
    return false;
  }

  render() {
    const actionSheetState = this.state.actionSheetState;
    const overlayPointerEvents = this.overlayPointerEvents();
    const actionSheetSize = this.actionSheetSize();
    const hidden = actionSheetState === ACTION_SHEET_CLOSED && styles.hidden;
    const isShowOverlay = (
      [ACTION_SHEET_OPENING, ACTION_SHEET_OPENED].includes(actionSheetState) && this.props.haveOverlay
    );
    const dimensions = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    const {
      containerStyle,
      overlayBackgroundColor,
      overlayOpacity,
      animationDuration,
      actionSheetStyle,
      actionSheetAnimation,
      children,
      actions,
    } = this.props;

    return (
      <View style={[styles.container, hidden, dimensions, containerStyle && containerStyle]}>
        <Overlay
          pointerEvents={overlayPointerEvents}
          showOverlay={isShowOverlay}
          onPress={this.onOverlayPress}
          backgroundColor={overlayBackgroundColor}
          opacity={overlayOpacity}
          animationDuration={animationDuration}
          onAnimationComplete={this.onAnimationComplete} />
        <Animated.View
          style={[
            styles.actionSheet,
            actionSheetSize,
            actionSheetStyle && actionSheetStyle,
            actionSheetAnimation.animations,
          ]} >
          { children || <ActionSheetView {...this.props} onCancel={() => this.dismiss()}/> }
        </Animated.View>
      </View>
    );
  }
}

export default ActionSheet;