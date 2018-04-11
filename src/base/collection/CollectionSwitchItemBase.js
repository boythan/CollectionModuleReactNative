import React, { Component, PureComponent, PropTypes, } from 'react'
import { Platform, View, StyleSheet, Switch } from 'react-native';
import { Text, } from "native-base";

import { AppStyles, AppColors, AppSizes } from '@theme';

class CollectionSwitchItemBase extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static propTypes = {
        data: PropTypes.any,
        selected: PropTypes.bool,
        textTitle: PropTypes.string,
        didValueChanged: PropTypes.any,
    };

    render = () => {
        const {
            data,
            selected,
            textTitle,
            didValueChanged,
            ...attributes,
          } = this.props;

        return (
            <View style={styles.cell}>
                <Text style={styles.cellText}>{textTitle}</Text>
                <Switch
                    style={styles.switch}
                    value={selected}
                    onValueChange={(value) => didValueChanged && didValueChanged(data, value)} />
            </View>
        )
    }
}

const iconDimen = 20;

const styles = StyleSheet.create({
    cell: {
        height: AppSizes.listItemBaseHeight,
        justifyContent: 'center',
        backgroundColor: AppColors.white,
    },
    cellText: {
        ...AppStyles.baseText,
        marginLeft: AppSizes.margin,
        color: AppColors.textPrimary,
    },
    switch: {
        position: 'absolute',
        alignSelf: 'center',
        right: AppSizes.marginSml,
    },
})

export default CollectionSwitchItemBase;