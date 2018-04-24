import React, { Component } from 'react';
import { Line, ButtonIcon, WebImage } from '@base';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { AppStyles, AppSizes, AppFonts } from '@theme';
import { Actions } from 'react-native-router-flux';
import { AppColors } from '@theme';
import _ from 'lodash';

// component's styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  item: {
    width: 90,
    height: 90,
    margin: 4,
    backgroundColor: AppColors.addMoreButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    margin: 4,
  },
  itemOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNameMedia: {
    position: 'absolute',
    width: '100%',
    height: 12,

  }
})
// create a component
export default class MediaListView extends Component {

  render() {
    let medias = [...this.props.data];

    if (this.props.enableAddMore) {
      medias.unshift({ isAddMore: true });
    }
    return (
      <View style={styles.container}>
        <FlatList
          renderItem={this.renderCell}
          data={medias}
          keyExtractor={this.keyExtractor}
          horizontal={true}
          style={styles.list}
        />
      </View>);
  }

  renderCell = ({ item, index }) => {
    const { isAddMore } = item;
    return (
      <TouchableOpacity activeOpacity={1} style={styles.item} onPress={() => {
        this.props.didSelect(item, index)
      }}>
        {isAddMore ?
          <ButtonIcon
            iconName={'add'}
            iconColor={AppColors.iconColor}
            iconSize={50}
            action={() => this.props.onClickAdd()}
          /> :
          <WebImage
            containerStyle={{ position: 'absolute', width: '100%', height: '100%' }}
            source={{ uri: item.url || item.uri }}
            // backupSource={{ uri: API.media.getImagePath(item.url, MediaType.other) }}
            resizeMode='cover'
          />
        }
      </TouchableOpacity>
    )
  }


  keyExtractor = (item, index) => {
    if (!item.id) {
      return index.toString();
    }
    return item.id
  }
}
