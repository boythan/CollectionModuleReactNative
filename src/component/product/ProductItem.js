import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

import { AppColors } from '@theme'
class ProductItem extends Component {
    constructor(props) {
        super(props);

    }

    //UI CONTROL ---------------------------------------------------------------------------------


    //UI RENDER ----------------------------------------------------------------------------------
    render() {
        const { product, onPress } = this.props;
        return <TouchableOpacity style={styles.container} onPress={onPress && onPress}>
            <View style={styles.containerImage}>
                <Image source={{ uri: product.image.src }} style={styles.image} resizeMode='contain' />
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.productName}>{product.name}</Text>
            </View>
        </TouchableOpacity>
    }
};

//Connect everything
export default ProductItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInfo: {
        width: '80%',
        paddingLeft: 16
    },
    productName: {
        fontSize: 16,
        color: AppColors.baseColor,
    },
    address: {
        fontSize: 12,
        color: AppColors.iconGray
    },
    containerImage: {
        padding: 8,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 7
    }
});