import React, { Component, PureComponent, PropTypes, } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, } from "native-base";

import { AppStyles, AppColors, AppSizes, AppFonts } from '@theme';

import ButtonIcon from '@component/ButtonIcon';

class CollectionItemBase extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            textContent: props.textContent,
        };
    }

    static propTypes = {
        data: PropTypes.any,
        selected: PropTypes.bool,
        disabledOnSelected: PropTypes.bool,
        showSelectedIcon: PropTypes.bool,
        selectedIcon: PropTypes.number,
        rightIcon: PropTypes.number,
        rightIconName: PropTypes.string,
        rightIconColor: PropTypes.string,
        rightIconAction: PropTypes.any,
        textTitle: PropTypes.string,
        containerColor: PropTypes.string,
        containerSelectedColor: PropTypes.string,
        textColor: PropTypes.string,
        textSelectedColor: PropTypes.string,
        didSelectItem: PropTypes.any,
        component: PropTypes.any,
    };

    static defaultProps = {
        containerColor: AppColors.white,
        containerSelectedColor: AppColors.blue,
        textColor: AppColors.textPrimary,
        textSelectedColor: AppColors.white,
        rightIcon: null,
        selectedIcon: require('@images/ic_check_box_checked.png'),
        textFont: AppFonts.base.family,
    }

    getIcon = (selectedIcon) => {
        const icon = selectedIcon ? selectedIcon : this.defaultProps.selectedIcon;
        return icon;
    }

    renderRightIcon = (rightIcon, rightIconName) => {
         if (rightIconName) {
            return (
                <ButtonIcon
                    action={this.props.rightIconAction}
                    iconName={rightIconName}
                    iconColor={this.props.rightIconColor}
                    style={styles.icon} />
            )
        } else if (rightIcon) {
            console.log(rightIcon);
            return (
                <ButtonIcon
                    action={this.props.rightIconAction}
                    source={rightIcon}
                    style={styles.icon} />
            )
        } else {
            return;
        }
    }

    render = () => {
        const {
            data,
            selected,
            disabledOnSelected,
            showSelectedIcon,
            selectedIcon,
            rightIcon,
            rightIconName,
            rightIconColor,
            rightIconAction,
            textTitle,
            containerColor,
            containerSelectedColor,
            textColor,
            textFont,
            textSelectedColor,
            didSelectItem,
            component,
          } = this.props;

        let Component = component || TouchableOpacity;
        // let { Component, } = this.props;
        // if (!Component && Platform.OS === 'ios') {
        //     Component = TouchableHighlight;
        // }
        // if (!Component && Platform.OS === 'android') {
        //     Component = TouchableNativeFeedback;
        // }
        // if (!Component) {
        //     Component = TouchableHighlight;
        // }

        return (
            <Component disabled={disabledOnSelected && selected} onPress={() => didSelectItem && didSelectItem(data)} activeOpacity={0.2}>
                <View
                    style={[styles.cell, { backgroundColor: (selected && !showSelectedIcon) ? containerSelectedColor : containerColor }]}>
                    <Text style={[styles.cellText, { color: (selected && !showSelectedIcon) ? textSelectedColor : textColor, fontFamily: textFont }]}>{textTitle}</Text>
                    {(showSelectedIcon && selected) &&
                        <ButtonIcon
                            isIcon={true}
                            source={this.getIcon(selectedIcon)}
                            style={styles.icon} />}
                    {!showSelectedIcon && this.renderRightIcon(rightIcon, rightIconName)}
                </View>
            </Component>
        )
    }
}

const iconDimen = 20;

const styles = StyleSheet.create({
    cell: {
        height: AppSizes.listItemBaseHeight,
        alignItems: 'center',
        flexDirection: 'row'
    },
    cellText: {
        ...AppStyles.baseText,
        marginLeft: AppSizes.margin,
        flex: 4
    },
    icon: {
        width: iconDimen,
        height: iconDimen,
        alignSelf: 'center',
        right: AppSizes.marginSml,
    },
})

export default CollectionItemBase;