import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {styles} from './ThumbnailSection.styles';
import eStyles from 'styles/MyCommonStyles';
import fStyles from 'styles/MyFontStyles';
import mStyles from 'styles/MarginStyles';
import FastImage from 'react-native-fast-image';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colorPrimaryApp} from 'utils/MyColors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {colorTextMain} from 'utils/MyColors';
import {getMediaThumbnailImage} from 'utils/MyUrlTemplateResolver';
import {colorTextHintPlaceholder} from 'utils/MyColors';
import RatingBar from 'shared/ratingBar/RatingBar';
import {isNetConnected} from 'networking/CheckNetwork';
import {getEmptyIfNull} from 'utils/MyCommonUtils';
import {MEDIA_TYPES} from 'aws/AwsAmplifyConfig';
import {getFilteredNotHiddenContent} from 'utils/MyCommonUtils';

export default class ThumbnailSection extends Component {
  //Props
  //categoryItem
  //title = (string) (Recommended for you, Top rated)
  //arrayData
  //onItemClick
  //onItemWatchlistClick(item)
  //onItemWatchedClick(item)
  //onItemRemovedFromList(item)
  //onRatingSubmitted(rating,item)
  //onSeeAllClick (categoryItem)
  //hasUserSignedIn
  //showSeeAll = true/false
  //titleTextStyle
  //isUserActivityOptionsVisible = true/false (Visibility : Watchlist, Watched, Give Rating, Remove from list)
  //onNetworkErrorOccurred

  constructor(props) {
    super(props);
    this.state = {
      arrayData: props.arrayData,
      allowed_features_Array: this.props.allowed_features_Array,
    };

    this._onStarPressed = this._onStarPressed.bind(this);
    this.refreshThumbnailsForUserActivities =
      this.refreshThumbnailsForUserActivities.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({arrayData: nextProps.arrayData});
  }
  refreshThumbnailsForUserActivities(arrayRefreshedData) {
    this.setState({
      arrayData: arrayRefreshedData,
    });
  }

  async _onStarPressed(item) {
    if (await isNetConnected()) {
      const {arrayData} = this.state;
      arrayData
        .filter(itemToFind => itemToFind.id == item.id)
        .forEach(
          itemResult =>
            (itemResult.isRatingBarVisible =
              itemResult.isRatingBarVisible == undefined ||
              itemResult.isRatingBarVisible == null
                ? true
                : !itemResult.isRatingBarVisible),
        );
      this.setState({arrayData});
    } else {
      if (this.props.onNetworkErrorOccurred != undefined)
        this.props.onNetworkErrorOccurred();
    }
  }

  _renderRatingBar = item => {
    return (
      <RatingBar
        isVisible={item.isRatingBarVisible}
        onRatingDone={ratingSubmitted => {
          this.props.onRatingSubmitted(ratingSubmitted, item);
        }}
      />
    );
  };

  _renderStarRatingGivenContainer = item => {
    const {rating} = item;
    const {isRatingBarVisible} = item;
    return rating != null && rating != undefined ? (
      <View style={{flexDirection: 'row'}}>
        {(isRatingBarVisible == undefined ||
          isRatingBarVisible == null ||
          isRatingBarVisible == false) && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.itemStarAndRatingContainer}
            onPress={() => this._onStarPressed(item)}>
            <FontAwesomeIcon
              name="star"
              color={colorPrimaryApp}
              size={11 * EStyleSheet.value('$rem')}
            />
            <Text
              style={[
                eStyles.boldText,
                fStyles.fontSize11,
                styles.itemStarRatingTextStyle,
              ]}>
              {'  ' + String(rating)}
            </Text>
          </TouchableOpacity>
        )}
        {this._renderRatingBar(item)}
      </View>
    ) : null;
  };

  _renderStarRatingNotGivenContainer = item => {
    const {isUserActivityOptionsVisible} = this.props;
    const {isRatingBarVisible} = item;
    return isUserActivityOptionsVisible ? (
      <View style={[{flexDirection: 'row'}]}>
        {(isRatingBarVisible == undefined ||
          isRatingBarVisible == null ||
          isRatingBarVisible == false) && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.itemStarRatingNotGivenContainer]}
            onPress={() => this._onStarPressed(item)}>
            <FontAwesomeIcon
              name="star"
              color={colorTextHintPlaceholder}
              size={12 * EStyleSheet.value('$rem')}
            />
          </TouchableOpacity>
        )}

        {this._renderRatingBar(item)}
      </View>
    ) : null;
  };

  _decideAndRenderStarContainer = item => {
    const {hasUserSignedIn} = this.props;
    return hasUserSignedIn
      ? getEmptyIfNull(item.rating) == ''
        ? this._renderStarRatingNotGivenContainer(item)
        : this._renderStarRatingGivenContainer(item)
      : null;
  };

  _renderWatchlist = item => {
    /**
     * watchlist => 1->Added to watchlist, 0->Not added to watchlist
     * watched => 1->Added to watched items, 0->Not added to watched items
     **/
    const {watchlist, watched} = item;

    return (
      <TouchableOpacity
        onPress={() => this.props.onItemWatchlistClick(item)}
        activeOpacity={0.8}
        style={[
          styles.iconItemContainer,
          watchlist == '1'
            ? styles.iconItemContainerColorSelected
            : styles.iconItemContainerColorDefault,
        ]}>
        <Ionicon
          name={watchlist == '1' ? 'bookmark' : 'bookmark-outline'}
          size={15 * EStyleSheet.value('$rem')}
          color={watchlist == '1' ? colorPrimaryApp : colorTextHintPlaceholder}
        />
      </TouchableOpacity>
    );
  };

  _renderWatched = item => {
    /**
     * watchlist => 1->Added to watchlist, 0->Not added to watchlist
     * watched => 1->Added to watched items, 0->Not added to watched items
     **/
    const {watchlist, watched} = item;
    return (
      <TouchableOpacity
        onPress={() => this.props.onItemWatchedClick(item)}
        activeOpacity={0.8}
        style={[
          styles.iconItemContainer,
          watched == '1'
            ? styles.iconItemContainerColorSelected
            : styles.iconItemContainerColorDefault,
        ]}>
        <FeatherIcon
          name="check-circle"
          color={watched == '1' ? colorPrimaryApp : colorTextHintPlaceholder}
          size={14 * EStyleSheet.value('$rem')}
        />
      </TouchableOpacity>
    );
  };

  _renderHideRemove = item => {
    return (
      <TouchableOpacity
        onPress={async () => {
          try {
            if (await isNetConnected()) {
              const itemToRemove = this.state.arrayData.find(
                itemToFind =>
                  itemToFind.id == item.id &&
                  itemToFind.media_type == item.media_type,
              );
              if (itemToRemove != undefined && itemToRemove != null) {
                itemToRemove['hide'] = '1';
                const arrayUpdatedData = getFilteredNotHiddenContent(
                  this.state.arrayData,
                );
                this.setState({
                  arrayData: arrayUpdatedData,
                });
              }
            }
          } catch (e) {
            console.log('ExcThumbnailSection_RemoveItem => ' + e);
          }

          this.props.onItemRemovedFromList(item);
        }}
        activeOpacity={0.8}
        style={[
          styles.iconItemContainer,
          styles.iconItemContainerColorDefault,
        ]}>
        <Ionicon
          name={'eye-off-outline'}
          size={17 * EStyleSheet.value('$rem')}
          color={colorTextHintPlaceholder}
        />
      </TouchableOpacity>
    );
  };

  _renderUserActivities = item => {
    const {isUserActivityOptionsVisible, hasUserSignedIn} = this.props;
    const {isRatingBarVisible} = item;
    return isUserActivityOptionsVisible != false && hasUserSignedIn ? (
      <View style={[styles.userActivitiesContainer, mStyles.marginTop5]}>
        {this._decideAndRenderStarContainer(item)}
        {isRatingBarVisible != true && this._renderHideRemove(item)}
        {isRatingBarVisible != true && this._renderWatched(item)}
        {isRatingBarVisible != true && this._renderWatchlist(item)}
      </View>
    ) : null;
  };

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

  _renderThumbnailImage = item => {
    const thumbnailImage =
      item['thumbnail_id'] != null && item['thumbnail_id'] != undefined
        ? getMediaThumbnailImage(
            item['media_type'],
            String(item['thumbnail_id']['mob']),
          )
        : undefined;
    return thumbnailImage == undefined ||
      thumbnailImage == null ||
      thumbnailImage == 'None' ? (
      this._renderThumbnailPlaceholderError()
    ) : (
      <Image
        style={
          item['media_type'] == MEDIA_TYPES.YOUTUBE
            ? styles.itemImageStyleYouTube
            : styles.itemImageStyle
        }
        // resizeMode={FastImage.resizeMode.cover}
        source={{
          uri:
            //'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlMlPwBdX8rSkppCVploXHEQhEnRTkmu3z7SLtr6Y4m2zZr4Oq&s',
            thumbnailImage,
        }}
      />
    );
  };

  _renderThumbnailItem = item => {
    /**
     * watchlist => 1->Added to watchlist, 0->Not added to watchlist
     * watched => 1->Added to watched items, 0->Not added to watched items
     **/
    const {watchlist, watched} = item;

    const {hasUserSignedIn} = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          const {isRatingBarVisible} = item;
          if (isRatingBarVisible == true) {
            item.isRatingBarVisible = false;
            this.setState({});
          } else {
            this.props.onItemClick(item);
          }
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
            {item.title_name == undefined
              ? 'Content Title ' + String(item.id)
              : item.title_name}
          </Text>

          {/* Star and Rating */}
          {hasUserSignedIn && this._renderUserActivities(item)}
        </View>
      </TouchableOpacity>
    );
  };

  _renderThumbnailItemYouTube = item => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onItemClick(item)}
        activeOpacity={0.6}
        style={styles.itemContainerYouTube}>
        <View
          style={
            item['media_type'] == MEDIA_TYPES.YOUTUBE
              ? styles.itemImageStyleYouTube
              : styles.itemImageStyle
          }>
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
            {item.title_name == undefined
              ? 'Content Title ' + String(item.id)
              : item.title_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderThumbnailData = () => {
    const {arrayData} = this.state;

    const arrayNotHiddenData = getFilteredNotHiddenContent(arrayData);
    return (
      <FlatList
        style={[mStyles.marginTop10, styles.flatListStyle]}
        data={arrayNotHiddenData}
        horizontal={true}
        extraData={this.props.arrayData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) =>
          item['media_type'] == MEDIA_TYPES.YOUTUBE
            ? this._renderThumbnailItemYouTube(item)
            : this._renderThumbnailItem(item)
        }
        keyExtractor={item => String(item.id) + '_' + String(item.media_type)}
      />
    );
  };

  render() {
    const {showSeeAll, titleTextStyle, categoryItem} = this.props;
    return (
      <View>
        {/* Header (Title, See All) */}
        <View style={styles.headerContainer}>
          {/* Title */}
          <Text
            style={[
              eStyles.boldText,
              styles.headerTitle,
              fStyles.fontSize15,
              titleTextStyle == undefined ? {} : titleTextStyle,
            ]}>
            {this.props.title}
          </Text>

          {/* See all */}
          {showSeeAll && categoryItem['see_all'] != false && (
            <TouchableOpacity
              onPress={() => this.props.onSeeAllClick(categoryItem)}
              activeOpacity={0.7}
              style={styles.headerSeeAllContainer}>
              <Text
                style={[
                  eStyles.boldText,
                  fStyles.fontSize12,
                  styles.headerSeeAllText,
                ]}>
                See all
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Thumbnail Data Section (List) */}
        {this._renderThumbnailData()}

        <View style={mStyles.marginTop15} />
      </View>
    );
  }
}
