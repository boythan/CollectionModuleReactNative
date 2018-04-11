/**
 * App Styles
 */
import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';
import { Platform } from 'react-native';
import { AppColors } from './colors';

const appStylesBase = {
  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    paddingVertical: Sizes.paddingSml,
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },
  // Give me margin
  margin: {
    margin: Sizes.margin,
  },
  marginHorizontal: {
    marginLeft: Sizes.margin,
    marginRight: Sizes.margin,
  },
  marginLeft: {
    marginLeft: Sizes.margin,
  },
  marginRight: {
    marginRight: Sizes.margin,
  },
  marginVertical: {
    marginTop: Sizes.margin,
    marginBottom: Sizes.margin,
  },
  marginTop: {
    marginTop: Sizes.margin,
  },
  marginBottom: {
    marginBottom: Sizes.margin,
  },
  marginSml: {
    margin: Sizes.marginSml,
  },
  marginHorizontalSml: {
    marginLeft: Sizes.marginSml,
    marginRight: Sizes.marginSml,
  },
  marginLeftSml: {
    marginLeft: Sizes.marginSml,
  },
  marginRightSml: {
    marginRight: Sizes.marginSml,
  },
  marginVerticalSml: {
    marginTop: Sizes.marginSml,
    marginBottom: Sizes.marginSml,
  },
  marginTopSml: {
    marginTop: Sizes.marginSml,
  },
  marginBottomSml: {
    marginBottom: Sizes.marginSml,
  },
  borderBase: {
    borderColor: Colors.border,
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
  },
}

export default AppStyles = {
  // Import app styles base
  ...appStylesBase,
  appContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  // Default
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  borderedCardContainer: {
    backgroundColor: Colors.cardBackground,
    margin: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.border,
    elevation: 1,
  },
  borderlessCardContainer: {
    backgroundColor: Colors.cardBackground,
    margin: 2,
    borderRadius: 5,
    shadowColor: Colors.border,
    elevation: 1,
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },
  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },
  // Text Styles
  baseText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },

  boldItalicText: {
    fontFamily: Fonts.boldItalic.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },

  italicText: {
    fontFamily: Fonts.italic.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },

  semiboldText: {
    fontFamily: Fonts.semibold.family,
    fontSize: Fonts.semibold.size,
    lineHeight: Fonts.semibold.lineHeight,
    color: Colors.textPrimary,
  },

  boldText: {
    fontFamily: Fonts.bold.family,
    fontSize: Fonts.bold.size,
    lineHeight: Fonts.bold.lineHeight,
    color: Colors.textPrimary,
  },

  hintText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textSecondary,
  },

  secondaryText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.gray,
  },

  p: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },
  h1: {
    fontFamily: Fonts.h1.family,
    fontSize: Fonts.h1.size,
    lineHeight: Fonts.h1.lineHeight,
    color: Colors.headingPrimary,
  },
  h2: {
    fontFamily: Fonts.h2.family,
    fontSize: Fonts.h2.size,
    lineHeight: Fonts.h2.lineHeight,
    color: Colors.headingPrimary,
  },
  h3: {
    fontFamily: Fonts.h3.family,
    fontSize: Fonts.h3.size,
    lineHeight: Fonts.h3.lineHeight,
    color: Colors.headingPrimary,
  },
  h4: {
    fontFamily: Fonts.h4.family,
    fontSize: Fonts.h4.size,
    lineHeight: Fonts.h4.lineHeight,
    color: Colors.headingPrimary,
  },
  h5: {
    fontFamily: Fonts.h5.family,
    fontSize: Fonts.h5.size,
    lineHeight: Fonts.h5.lineHeight,
    color: Colors.headingPrimary,
  },
  strong: {
    fontWeight: '900',
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand.primary,
  },
  subText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size * 0.8,
    lineHeight: parseInt(Fonts.base.lineHeight * 0.8, 10),
    color: Colors.textSecondary,
  },
  subTextSemibold: {
    fontFamily: Fonts.semibold.family,
    fontSize: Fonts.semibold.size * 0.75,
    lineHeight: parseInt(Fonts.semibold.lineHeight * 0.75, 10),
    color: Colors.textSecondary,
  },
  tinyText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size * 0.55,
    lineHeight: parseInt(Fonts.base.lineHeight * 0.55, 10),
    color: Colors.textSecondary,
  },
  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },
  // General HTML-like Elements
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: Sizes.padding,
    marginBottom: Sizes.padding,
  },
  // Grid
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
  // Navbar
  navbar: {
    backgroundColor: Colors.navbar.background,
    borderBottomWidth: 0,
    shadowColor: Colors.border,
    elevation: 1,
    zIndex: 1,
  },
  //searchbar
  searchbar: {
    textInput: {
      fontFamily: Fonts.base.family,
      fontSize: Sizes.fontSearch,
      color: Colors.searchbar.textInput,
      flex: 1,
      paddingHorizontal: Sizes.paddingXXSml,
    },

    searchContainer: {
      backgroundColor: Colors.searchbar.background,
      flexDirection: 'row',
      alignItems: 'center',
      height: Sizes.navbarHeight
    },

    searchContentContainer: {
      backgroundColor: Colors.searchbar.backgroundText,
      flex: 1,
      height: Sizes.textInputHeight,
      marginHorizontal: Sizes.marginSml,
      borderRadius: Sizes.roundBorderRadius,
      flexDirection: 'row',
      alignItems: 'center',
    },

    searchIcon: {
      marginLeft: Sizes.marginSml,
      width: Sizes.imageSizeBase,
      height: Sizes.imageSizeBase,
    }
  },

  navbarTitle: {
    color: Colors.textNavbar,
    fontFamily: Fonts.base.family,
    fontSize: Fonts.h3.size,
    fontWeight: '400',
  },
  navbarButton: {
    width: 20,
    height: 20,
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  // TabBar
  tabbar: {
    backgroundColor: Colors.tabbar.background,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
  topTabbar: {
    style: {
      backgroundColor: '#fff',
      ...Platform.select({
        ios: {
          elevation: 1,
          shadowColor: '#999',
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          shadowOffset: {
            height: 1,
          },
        },
        android: {
          elevation: 1,
          shadowColor: '#333',
          shadowOpacity: 0.1,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        }
      }),
    },
    tabStyle: {
      width: 120,
    },
    indicatorStyle: {
      backgroundColor: Colors.cerulean,
    },
    titleStyle: {
      fontFamily: Fonts.bold.family,
      fontSize: Fonts.h2.size,
      margin: 6,
    },
    colors: {
      activeColor: Colors.cerulean,
      inactiveColor: Colors.darkgray,
    }
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.divider,
  },
  // More
  title: {
  },
  nextIcon: {
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 3,
    borderTopColor: '#C9C9C9',
    borderTopWidth: 1,
    borderBottomColor: '#C9C9C9',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  viewColumn: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    ...appStylesBase.paddingHorizontalSml,
    ...appStylesBase.borderBase,
    ...appStylesBase.baseText,
    width: Sizes.textInputWidth,
    height: Sizes.textInputHeight,
    backgroundColor: Colors.white,
    fontSize: Sizes.fontBase,
    color: Colors.textPrimary,
  },
  fabButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    shadowColor: Colors.darkgray,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fabUploadingButton: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    shadowColor: Colors.darkgray,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  buttonDone: {
    backgroundColor: '#00CC14',
    margin: Sizes.paddingXSml,
    borderRadius: Sizes.paddingXXSml,
    width: Sizes.screen.width - 2 * Sizes.paddingXSml,
    height: 45
  },
  textDone: {
    fontFamily: Fonts.semibold.family,
    fontSize: 16,
    color: 'white'
  },
  textDoneDisable: {
    fontFamily: Fonts.semibold.family,
    fontSize: 16,
    color: 'rgba(250, 250, 250, 0.5)',
  },
  fabIcon: {
    fontSize: 24,
    color: Colors.gray,
  },
  noResult: {
    marginTop: Sizes.paddingXXSml,
    marginBottom: Sizes.paddingXXSml,
    fontFamily: Fonts.base.family,
    fontSize: 15,
    color: '#A0ABBE',
    width: '80%',
    textAlign: 'center',
  },
  fullScreen: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ipXNavBarHeight: {
    height: 84
  },
  ipXNavBarTop: {
    top: 40,
  },
  emptyView: {
    text: {
      fontFamily: Fonts.base.family,
      fontSize: 15,
      color: '#A0ABBE',
      textAlign: 'center',
    },
    progress: {
      backgroundColor: 'transparent',
      margin: Sizes.padding
    },
    error: {
      retry: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
      }
    }
  },
  searchIcon: {
    marginLeft: Sizes.marginSml,
    width: 20,
    height: 20
  }
};
