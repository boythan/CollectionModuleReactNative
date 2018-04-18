import React, { Component } from 'react';
import { View, StyleSheet, InteractionManager, Button, Text } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { AppStyles, AppSizes, AppColors, } from '@theme';
import _ from 'lodash';
import { Messages } from '../../../constant/message';
import PropTypes from 'prop-types';

interface ScrollableTabInterface<Route> {
  tabs: Promise<Array<Route>>;
}

class ScrollableTabScreen<Route> extends Component implements ScrollableTabInterface<Route> {

  static propTypes = {
    /**
     *  in case 'number': jump to tab index
     *  in case 'string': jump to tab with title
     */
    selectedTab: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      navigation: {
        index: 0,
        routes: []
      }
    }; // navigation state for loading tabs
  }

  /**
    * Wait until any interactions are finished, before setting up tabs
    */
  // componentDidMount = () => {
  //   this._calculateTabs();
  // }

  arrayIsEmpty = (arr) => {
    return !arr || arr.length <= 0;
  }
  /**
   * Calculate tabs of pager.
   * Set to navigation state.
   */
  _calculateTabs(selectedTab): void {

    
    this.tabs().then(
      (routes) => {
        this.setState({ errorInitTab: false });
        if (this._unmounted) return;
        if (this.arrayIsEmpty(routes)) return;
        routes.forEach(function (element) {
          if (!element.title) {
            throw ('title of Tab must be defined');
          }
          element.key = element.title;
        }, this);
        this._initTabs(routes, selectedTab || this.props.selectedTab);
      }
    ).catch(err => {
      this.setState({ errorInitTab: true });
    });
  }

  _initTabs(routes: Array<Route>, selectedTab) {
    const index = this._findTabIndex(routes, selectedTab);
    this.setState({ navigation: { index, routes } }, () => {
      this.tabDidLoad && this.tabDidLoad(this.state.navigation.routes)
    });
  }

  _findTabIndex(routes: Array<Route>, tab) {
    let index = 0;
    if (_.isString(tab)) {
      // find the right index in routes via title
      for (let i = 0; i < routes.length; i++) {
        if (tab === routes[i].title) { // found it
          index = i;
          break;
        }
      }
    } else if (_.isNumber(tab)) {
      index = Math.max(Math.min(routes.length - 1, tab), 0); // in range [0...length-1]
    }
    return index;
  }

  renderScene = ({ route }) => {
    const navigation = this.state.navigation;

    //render only 1 route on each side:
    if (Math.abs(navigation.index - navigation.routes.indexOf(route)) > this._numOfRenderScene()) {
      return null;
    }

    // Which component should be loaded?
    return <route.component {...route.props} />;
  }

  _numOfRenderScene = () => {
    return 1;
  }

  /**
    * Header Component
    */
  renderHeader = props => (
    <TabBar {...props}
      style={AppStyles.topTabbar.style}
      tabStyle={props.scrollEnabled && AppStyles.topTabbar.tabStyle}
      indicatorStyle={AppStyles.topTabbar.indicatorStyle}
      renderLabel={scene => (
        <Text style={[{ ...AppStyles.topTabbar.titleStyle }, { color: scene.focused ? AppStyles.topTabbar.colors.activeColor : AppStyles.topTabbar.colors.inactiveColor }, { fontSize: AppSizes.fontSmall, }]}>{scene.route.title.toUpperCase()}</Text>
      )}
    />
  )

  /**
    * On Change Tab
    */
  handleIndexChange = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    }, () => {
      if (!this.state.navigation) return;
      this.tabDidChange && this.tabDidChange(this.state.navigation.routes[this.state.navigation.index]);
    });
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  tabReceivedProps(nextProps) {
    const selectedTab = nextProps.selectedTab;
    if (selectedTab == null || selectedTab == undefined) {
      return;
    }
    if (!this.state.navigation) return null;
    const index = this._findTabIndex(this.state.navigation.routes, selectedTab);
    if (index !== this.state.navigation.index) {
      this.setState({ navigation: { ...this.state.navigation, index } });
    }
  }

  getCurrentTab() {
    if (!this.state.navigation) return null;
    return this.state.navigation.routes[this.state.navigation.index];
  }
  /**render emty view when init tab fail */
  renderError = () => {
    return (
      <View>
        <Text style={[AppStyles.emptyView.text, { marginBottom: AppSizes.paddingSml }]}>{Messages.emptyView.error}</Text>
        <Button onPress={() => this._calculateTabs()} style={AppStyles.emptyView.error.retry}>
          <Text>{Messages.emptyView.retry}</Text>
        </Button>
      </View >
    );
  }
}

export default ScrollableTabScreen;