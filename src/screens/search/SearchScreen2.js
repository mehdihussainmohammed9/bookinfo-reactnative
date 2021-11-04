import React, {useState} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-community/voice';
import EStyleSheet from 'react-native-extended-stylesheet';

import MyStatusBar from '../../shared/statusBar/MyStatusBar';
import MyInputBoxSearch from '../../shared/inputSearch/MyInputBoxSearch';

import eStyles from '../../styles/MyCommonStyles';
import {styles} from './SearchScreen.styles';
import mStyles from '../../styles/MarginStyles';

import {colorPrimaryApp} from '../../utils/MyColors';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const [state, setState] = useState({
    strSearchInput: '',
    arraySearchData: [],

    arrayFilteredResultsData: [],
    filterParamsInputJson: {},
    isFilterApplied: false,

    searchErrorMessage: '',

    isLoading: false,
    isNetworkError: false,
    errorTitle: '',
    errorMsg: '',
    isErrorDialogVisible: false,

    //speechState: SPEECH_STATES.SPEECH_YET_TO_BEGIN,
    isVoiceSearchFeatureAvailable: false,
    arraySpeechResults: [],
    isUpgradePlanRequiredDialogVisible: false,

    allowed_features: [],
  });

  const _onChangeTextMakeApiCall = strSearchInput => {

    setTimeout(async () => {
      if (String(strSearchInput).trim().length >= 3) {
        _apiCallSearchContent(strSearchInput);
      } else {
        setState({
          arraySearchData: [],
          searchErrorMessage: '',
          isLoading: false,
        });
      }
    }, 50);
  };
  const _apiCallSearchContent = strSearchInput => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${strSearchInput}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {

        setState({
          // ...state,
          // arraySearchData: res.items,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _renderSearchBar = () => {
    const {isVoiceSearchFeatureAvailable} = true;

    return (
      <View style={styles.searchInputBoxContainer}>
        {/* Voice Search Button */}

        <View style={styles.voiceSearchbButtonContainer}>
          <TouchableOpacity
            //  onPress={this._onSpeakButtonPressed}
            activeOpacity={0.6}
            style={styles.voiceSearchIconContainer}>
            <FeatherIcon
              name={'mic'}
              color={colorPrimaryApp}
              size={22 * EStyleSheet.value('$rem')}
            />
          </TouchableOpacity>
        </View>

        {/* Search Input Box */}
        <View
          style={[
            styles.searchInputOuterContainer,
            {flex: isVoiceSearchFeatureAvailable ? 0.76 : 0.88},
          ]}>
          <MyInputBoxSearch
            ref={myInputBoxSearch => (myInputBoxSearch = myInputBoxSearch)}
            value={state.strSearchInput}
            placeholder={'Search Books'}
            onChangeText={e => {
              _onChangeTextMakeApiCall(e);
            }}
            onClearSerchText={() => {
              setState({
                ...state,
                strSearchInput: '',
                searchErrorMessage: '',
                isLoading: false,
                arraySearchData: [],
              });
            }}
          />
        </View>
      </View>
    );
  };

  const _renderSearchDataList = () => {
    return (
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        style={styles.flatListStyle}
        data={state.arraySearchData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          //   <ThumbnailItem item={item} onItemClick={this._onItemClick} />
          <Text item={item}>d</Text>
        )}
        numColumns={2}
        keyExtractor={item => String(item.id) + '_' + String(item.media_type)}
      />
    );
  };
  return (
    <View style={[eStyles.container, eStyles.defaultBackgroundContainer]}>
      <MyStatusBar />
      <View style={[eStyles.container, mStyles.marginTop10]}>
        {_renderSearchBar()}
        {_renderSearchDataList()}
      </View>
    </View>
  );
};

export default SearchScreen;
