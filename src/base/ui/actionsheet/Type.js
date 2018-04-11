export type PopupActionSheetType = {
  dialogTitle?: any;
  children: any;
}

export type ActionSheetType = {
  width?: number;
  height?: number;
  haveOverlay: boolean;
  overlayPointerEvents?: string;
  overlayBackgroundColor?: string;
  overlayOpacity?: number;
  actionSheetAnimation?: Object;
  actionSheetStyle?: any;
  containerStyle?: any;
  animationDuration?: number;
  dismissOnTouchOutside?: boolean;
  dismissOnHardwareBackPress?: boolean;
  show?: boolean;
  onShown?: Function;
  onDismissed?: Function;
  actions?: Array<any>;
  children: any;
}

export type DialogButtonType = {
  text: string;
  onPress: Function;
  align?: string;
  buttonStyle?: any;
  textStyle?: any;
  textContainerStyle?: any;
  disabled?: boolean;
  activeOpacity?: number;
}

export type DialogTitleType = {
  title: any;
  titleStyle?: any;
  titleTextStyle?: any;
  titleAlign?: string;
  haveTitleBar?: boolean;
}

export type OverlayType = {
  onPress: Function;
  backgroundColor?: string;
  opacity?: number;
  animationDuration?: number;
  showOverlay?: boolean;
  pointerEvents?: string;
}