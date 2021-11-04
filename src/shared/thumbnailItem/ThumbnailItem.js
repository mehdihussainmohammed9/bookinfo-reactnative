import React, {Component, PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './ThumbnailItem.styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import eStyles from '../../styles/MyCommonStyles';
import fStyles from '../../styles/MyFontStyles';
import {colorTextHintPlaceholder} from '../../utils/MyColors';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import {isNetConnected} from '../../networking/CheckNetwork';

export default class ThumbnailItem extends Component {
  //Props
  //item
  //hasUserSignedIn
  //onItemClick(item)
  //onRemoveFromListClick(item)
  //onToggleWatchedClick(item)
  //onToggleWatchlistClick(item)
  //onRatingSubmitted(rating,item)
  //showUserActivityOptions = default undefined/false

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderThumbnailPlaceholderError = () => {
    return (
      <View style={styles.itemImageStyle}>
        <Ionicon
          size={40 * EStyleSheet.value('$rem')}
          color={colorTextHintPlaceholder}
          name={'image-outline'}
        />
      </View>
    );
  };

  _renderThumbnailImage = e => {
    var item = e;
    console.log('IMAGE++>', item?.volumeInfo?.imageLinks?.smallThumbnail);
    const thumbnailImage =
      item?.volumeInfo?.imageLinks?.smallThumbnail != undefined ||
      item?.volumeInfo?.imageLinks?.thumbnail != undefined
        ? item?.volumeInfo?.imageLinks?.smallThumbnail
        : item?.volumeInfo?.imageLinks?.thumbnail;

    return thumbnailImage == undefined ||
      thumbnailImage == null ||
      thumbnailImage == 'None' ? (
      //this._renderThumbnailPlaceholderError()

      <View style={styles.itemImageStyle}>
        <Ionicon
          size={40 * EStyleSheet.value('$rem')}
          color={colorTextHintPlaceholder}
          name={'image-outline'}
        />
      </View>
    ) : (
      <Image
        style={styles.itemImageStyle}
        // resizeMode={FastImage.resizeMode.cover}
        source={{
          // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlMlPwBdX8rSkppCVploXHEQhEnRTkmu3z7SLtr6Y4m2zZr4Oq&s',
          uri: item?.volumeInfo?.imageLinks?.smallThumbnail,
        }}
      />
    );
    // return (
    //   <Image
    //     style={styles.itemImageStyle}
    //     resizeMode={FastImage.resizeMode.cover}
    //     source={{
    //       uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlMlPwBdX8rSkppCVploXHEQhEnRTkmu3z7SLtr6Y4m2zZr4Oq&s',
    //       // thumbnailImage,
    //     }}
    //   />
    // );
  };

  _renderThumbnailItem = item => {
    return (
      <View style={{flex: 1 / 2}}>
        <TouchableOpacity
          onPress={() => {
            this.props.onItemClick(item);
          }}
          activeOpacity={0.6}
          style={styles.itemContainer}>
          <View style={styles.itemImageStyle}>
            {/* Image */}
            {this._renderThumbnailImage(item)}
          </View>

          <View style={styles.itemTextContainer}>
            {/* Title */}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                eStyles.boldText,
                fStyles.fontSize12,
                {textAlign: 'center'},
              ]}>
              - {item.volumeInfo?.authors}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return this._renderThumbnailItem(this.props.item);
  }
}
