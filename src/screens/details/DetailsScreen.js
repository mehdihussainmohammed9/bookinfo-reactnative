import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
  Share,
  Image
} from 'react-native';
import MyStatusBar from '../../shared/statusBar/MyStatusBar';
import mStyles from '../../styles/MarginStyles';
import eStyles from '../../styles/MyCommonStyles';
import fStyles from '../../styles/MyFontStyles';
import {styles} from './DetailsScreen.styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';

import EStyleSheet from 'react-native-extended-stylesheet';
import MyBackButton from '../../shared/buttonBack/MyBackButton';
import FastImage from 'react-native-fast-image';
import {
  colorTextHintPlaceholder,
  colorTextMain,
  colorPrimaryBackground,
  colorStarYellow,
  colorPrimaryApp,
} from '../../utils/MyColors';
import ReadMore from 'react-native-read-more-text';
import {isJsonEmpty} from '../../utils/MyCommonUtils';
import {isNetConnected} from 'networking/CheckNetwork';
import {ERROR_TITLE, ERROR_GENERAL_MSG} from 'utils/MyErrorMessages';

import {isAndroid} from '../../utils/MyCommonUtils';

import MyButton from '../../shared/button/MyButton';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    const {contentDetailsJson} = props.route.params;
    this.state = {
      contentDetailsJson: contentDetailsJson,
      firebaseDeepLink: '',

      isLoading: false,
      isNetworkError: false,
      errorTitle: '',
      errorMsg: '',
      isErrorDialogVisible: false,

      pageNumberForSeasons: 0,
      totalNumberOfSeasons: 0,
      isAlreadyLoadingSeasons: false,

      isRatingDialogVisible: false,
      isRatingBarVisible: false,
      ratingAlreadyGivenByUser: 0,

      arrayStreamingOptions: [],
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._onSubmitSampleRead = this._onSubmitSampleRead.bind(this);

    //For all sub titles used in this page - About, Cast & Crew, Similar
    this.subTitleStyles = [eStyles.boldText, fStyles.fontSize16];
  }

  componentDidMount() {
    const {hasUserSignedIn, contentJson} = this.state;
  }
  _onSubmit() {
    const {contentDetailsJson} = this.state;

    this.props.navigation.navigate('WebView', {
      url: contentDetailsJson.saleInfo.buyLink,
    });
  }
  _onSubmitSampleRead() {
    const {contentDetailsJson} = this.state;

    this.props.navigation.navigate('WebView', {
      url: contentDetailsJson.accessInfo.webReaderLink,
    });
  }
  _renderHeaderMainContentImage = () => {
    const {contentJson, contentDetailsJson} = this.state;
    const isContentDetailsNotEmpty = !isJsonEmpty(
      contentDetailsJson.volumeInfo.imageLinks,
    );

    let contentImage = null;
    try {
      if (isContentDetailsNotEmpty) {
        contentImage =
          contentDetailsJson.volumeInfo.imageLinks.thumbnail != null &&
          contentDetailsJson.volumeInfo.imageLinks.thumbnail != undefined
            ? contentDetailsJson.volumeInfo.imageLinks.thumbnail
            : null;
      }
    } catch (e) {
      console.log('==Exception _renderHeaderMainContentImage==');
      console.log('' + e);
      contentImage = null;
    }

    // console.log('ContentImageURL => ' + contentImage);
    return isContentDetailsNotEmpty ? (
      <View style={styles.headerImageContainer}>
        {contentImage != null && (
          <Image
            style={styles.headerBackgroundImageStyle}
            // resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: contentImage, // 'https://media.gettyimages.com/photos/director-joe-russo-anthony-russo-mark-ruffalo-chris-evans-robert-jr-picture-id1138817042?s=2048x2048',
            }}
          />
        )}

        <View style={styles.headerBackgroundImageOverlay}>
          {contentImage != null && (
            <Image
              style={styles.headerImageThumbnailStyle}
              // resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: contentImage, // 'https://media.gettyimages.com/photos/director-joe-russo-anthony-russo-mark-ruffalo-chris-evans-robert-jr-picture-id1138817042?s=2048x2048',
              }}
            />
          )}

          {contentImage == null && (
            <Ionicon
              size={60 * EStyleSheet.value('$rem')}
              color={colorTextHintPlaceholder}
              name={'image-outline'}
            />
          )}
        </View>
      </View>
    ) : (
      <View style={styles.headerImageContainer} />
    );
  };

  _renderHeaderSection = () => {
    const {contentDetailsJson} = this.state;
    const isContentDetailsNotEmpty = !isJsonEmpty(contentDetailsJson);

    return (
      <View style={styles.headerMainContainer}>
        {/* Image */}
        {this._renderHeaderMainContentImage()}

        {/* Other Text Content */}
        <View style={styles.headerContentContainer}>
          {/* Title */}

          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={[
              eStyles.boldText,
              fStyles.fontSize18,
              styles.headerTitleTextStyle,
            ]}>
            {isContentDetailsNotEmpty
              ? contentDetailsJson.volumeInfo.title
              : contentDetailsJson.volumeInfo.title}
          </Text>
        </View>
        {contentDetailsJson.volumeInfo.averageRating && (
          <View>
            <Text style={{margin: 15}}>
              <Rating
                tintColor={colorPrimaryBackground}
                type="custom"
                ratingColor={colorStarYellow}
                ratingBackgroundColor="#c8c7c8"
                ratingCount={5}
                imageSize={18 * EStyleSheet.value('$rem')}
                startingValue={contentDetailsJson.volumeInfo.averageRating}
              />
            </Text>
          </View>
        )}

        <MyBackButton
          isTransaparentEnclosedButton={true}
          onClick={() => this.props.navigation.goBack()}
        />
      </View>
    );
  };
  _renderLoadingIndicator = () => {
    const {isLoading} = this.state;
    return isLoading ? (
      <ActivityIndicator
        style={mStyles.marginTop40}
        size="large"
        color={colorPrimaryApp}
      />
    ) : null;
  };
  _renderTruncatedFooterReadMore = handlePress => {
    return (
      <Text
        style={[
          eStyles.boldText,
          fStyles.fontSize12,
          styles.readMoreTextStyle,
          mStyles.marginTop3,
        ]}
        onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooterReadLess = handlePress => {
    return (
      <Text
        style={[
          eStyles.boldText,
          fStyles.fontSize12,
          styles.readMoreTextStyle,
          mStyles.marginTop3,
        ]}
        onPress={handlePress}>
        Read less
      </Text>
    );
  };

  _renderDescriptionSection = () => {
    const {contentDetailsJson} = this.state;

    return (
      <View
        style={[
          styles.aboutSectionContainer,
          mStyles.marginTop15,
          mStyles.marginBottom20,
        ]}>
        <Text style={this.subTitleStyles}>Description</Text>

        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={this._renderTruncatedFooterReadMore}
          renderRevealedFooter={this._renderRevealedFooterReadLess}>
          <Text
            style={[
              eStyles.boldText,
              fStyles.fontSize13,
              styles.aboutContentTextStyle,
              mStyles.marginTop6,
            ]}>
            {contentDetailsJson.volumeInfo.description}
          </Text>
        </ReadMore>
      </View>
    );
  };
  _renderAboutSection = () => {
    const {contentDetailsJson} = this.state;

    return (
      <View style={[styles.aboutSectionContainer, mStyles.marginTop15]}>
        <Text style={this.subTitleStyles}>About</Text>
        <Text
          style={[
            eStyles.boldText,
            fStyles.fontSize13,
            styles.aboutContentTextStyle,
            mStyles.marginTop6,
          ]}>
          Author: {contentDetailsJson.volumeInfo.authors[0]}
        </Text>
        <Text
          style={[
            eStyles.boldText,
            fStyles.fontSize13,
            styles.aboutContentTextStyle,
            mStyles.marginTop6,
          ]}>
          Published by
          <Text style={{color: colorPrimaryApp}}>
            {' ' + contentDetailsJson.volumeInfo.publisher + ' '}
          </Text>
          on
          <Text style={{color: colorPrimaryApp}}>
            {' ' + contentDetailsJson.volumeInfo.publishedDate + ' '}
          </Text>
        </Text>
      </View>
    );
  };
  _renderPricingSection = () => {
    const {contentDetailsJson} = this.state;
    return (
      <View style={[styles.aboutPricingContainer]}>
        {contentDetailsJson.saleInfo?.listPrice ? (
          <View style={styles.row}>
            <TouchableOpacity style={[styles.priceButton]}>
              <MyButton
                text={'Free sample'}
                onClick={this._onSubmitSampleRead}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.priceButton]}>
              {contentDetailsJson.saleInfo.listPrice.amount === 0 ? (
                <MyButton text={'₹0 Read Now'} onClick={this._onSubmit} />
              ) : (
                <MyButton
                  text={`₹${contentDetailsJson.saleInfo.retailPrice.amount}`}
                  Strikethrough={true}
                  StrikethroughText={`₹${contentDetailsJson.saleInfo.listPrice.amount}`}
                  onClick={this._onSubmit}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.aboutSectionContainer, mStyles.marginTop15]}>
            <Text style={this.subTitleStyles}>Not Available</Text>
          </View>
        )}
      </View>
    );
  };
  _renderAdditionalInfoSection = () => {
    const {contentDetailsJson} = this.state;
    let authorsCount =
      contentDetailsJson.volumeInfo.authors.length > 0 ? true : false;
    return (
      <View style={[styles.aboutSectionContainer, mStyles.marginTop15]}>
        <Text style={this.subTitleStyles}>Reading Information</Text>
        {authorsCount ? (
          <Text
            style={[
              eStyles.boldText,
              fStyles.fontSize13,
              styles.aboutContentTextStyle,
              mStyles.marginTop6,
            ]}>
            Other Authors: {contentDetailsJson.volumeInfo.authors.toString()}
          </Text>
        ) : (
          <View />
        )}
        <Text
          style={[
            eStyles.boldText,
            fStyles.fontSize13,
            styles.aboutContentTextStyle,
            mStyles.marginTop6,
          ]}>
          Page Count: {contentDetailsJson.volumeInfo.pageCount}
        </Text>
        {contentDetailsJson.volumeInfo.ratingsCount !== undefined && (
          <Text
            style={[
              eStyles.boldText,
              fStyles.fontSize13,
              styles.aboutContentTextStyle,
              mStyles.marginTop6,
            ]}>
            Ratings Count: {contentDetailsJson.volumeInfo.ratingsCount + ' '}
            <Ionicon
              size={13 * EStyleSheet.value('$rem')}
              color={colorPrimaryApp}
              name={'person'}
            />
          </Text>
        )}
        {contentDetailsJson.volumeInfo.categories !== undefined && (
          <Text
            style={[
              eStyles.boldText,
              fStyles.fontSize13,
              styles.aboutContentTextStyle,
              mStyles.marginTop6,
            ]}>
            Categories: {contentDetailsJson.volumeInfo.categories.toString()}
          </Text>
        )}
      </View>
    );
  };
  render() {
    return (
      <View style={eStyles.container}>
        <MyStatusBar />
        <ScrollView
          style={[eStyles.container, eStyles.defaultBackgroundContainer]}>
          <View style={eStyles.container}>
            {this._renderHeaderSection()}

            {this._renderLoadingIndicator()}

            {this._renderPricingSection()}

            {this._renderAboutSection()}

            {this._renderAdditionalInfoSection()}

            {this._renderDescriptionSection()}
            
           </View>
        </ScrollView>
      </View>
    );
  }
}
