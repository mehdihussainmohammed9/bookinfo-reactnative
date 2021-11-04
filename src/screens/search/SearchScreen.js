import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Voice from '@react-native-community/voice';
// import Voice from '@react-native-voice/voice';

import EStyleSheet from 'react-native-extended-stylesheet';
import ThumbnailItem from '../../shared/thumbnailItem/ThumbnailItem';
import MyDialogError from '../../shared/dialogError/MyDialogError';

import MyStatusBar from '../../shared/statusBar/MyStatusBar';
import MyInputBoxSearch from '../../shared/inputSearch/MyInputBoxSearch';
import HorizontalVoiceSearchResults from '../../shared/horizontalVoiceSearchResults/HorizontalVoiceSearchResults';

import eStyles from '../../styles/MyCommonStyles';
import fStyles from '../../styles/MyFontStyles';

import {styles} from './SearchScreen.styles';
import mStyles from '../../styles/MarginStyles';
import {apiCallGet} from '../../networking/RestApiCalls';
import {isNetConnected} from '../../networking/CheckNetwork';

import {colorPrimaryApp} from '../../utils/MyColors';
import {isAndroid} from '../../utils/MyCommonUtils';
import {ERROR_NETWORK_MSG} from '../../utils/MyErrorMessages';

import {requestRecordAudioPermission} from '../../utils/MyAndroidPermissions';
import Toast from 'react-native-simple-toast';

import FeatherIcon from 'react-native-vector-icons/Feather';
import RNExitApp from 'react-native-exit-app';

const SPEECH_STATES = {
  SPEECH_YET_TO_BEGIN: 0,
  SPEECH_RUNNING: 1,
  SPEECH_ENDED: 2,
};

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strSearchInput: '',
      arraySearchData: [],

      filterParamsInputJson: {},

      searchErrorMessage: '',

      isLoading: false,
      isNetworkError: false,
      errorTitle: '',
      errorMsg: '',
      isErrorDialogVisible: false,

      speechState: SPEECH_STATES.SPEECH_YET_TO_BEGIN,
      isVoiceSearchFeatureAvailable: true,
      arraySpeechResults: [],
      isUpgradePlanRequiredDialogVisible: false,

      allowed_features: [],
    };

    this._currentApiPromise = undefined;

    this._onChangeTextMakeApiCall = this._onChangeTextMakeApiCall.bind(this);

    this._showLoadingIndicator = this._showLoadingIndicator.bind(this);
    this._hideLoadingIndicator = this._hideLoadingIndicator.bind(this);
    this._showErrorDialog = this._showErrorDialog.bind(this);

    this._apiCallSearchContent = this._apiCallSearchContent.bind(this);
    this._onSearchContentApiPromiseReceived =
      this._onSearchContentApiPromiseReceived.bind(this);
    this._onSearchContentSuccess = this._onSearchContentSuccess.bind(this);
    this._onSearchContentFailure = this._onSearchContentFailure.bind(this);
    this._removeBackButtonListener = this._removeBackButtonListener.bind(this);
    this._handleBackButton = this._handleBackButton.bind(this);

    this._stopCurrentSearchApiCall = this._stopCurrentSearchApiCall.bind(this);

    this._onItemClick = this._onItemClick.bind(this);

    this._resetAllSearchData = this._resetAllSearchData.bind(this);

    this._onSpeakButtonPressed = this._onSpeakButtonPressed.bind(this);
    this._initVoiceSearchPermission =
      this._initVoiceSearchPermission.bind(this);

    this._startVoiceRecording = this._startVoiceRecording.bind(this);

    this._checkVoiceSearchFeatureAvailableOrNot =
      this._checkVoiceSearchFeatureAvailableOrNot.bind(this);

    Voice.onSpeechStart = this._onSpeechStart.bind(this);
    Voice.onSpeechEnd = this._onSpeechEnd.bind(this);
    Voice.onSpeechResults = this._onSpeechResults.bind(this);
  }

  //========Voice Search Start=========//

  async _checkVoiceSearchFeatureAvailableOrNot() {
    const isVoiceSearchAvailable = await Voice.isAvailable();
    console.log('isVoiceSearchAvailable', isVoiceSearchAvailable);
    if (isVoiceSearchAvailable) {
      this.setState({
        isVoiceSearchFeatureAvailable: true,
      });
    }
  }

  async _initVoiceSearchPermission() {
    const self = this;

    if (isAndroid()) {
      requestRecordAudioPermission(
        this._startVoiceRecording,
        function onNeverAskAgain(errMsg) {
          self._showErrorDialog(false, errMsg);
        },
      );
    } else {
      this._startVoiceRecording();
    }
  }

  async _startVoiceRecording() {
    await Voice.start('en-GB');
    console.log('onSpeechStart start');
  }

  async _onSpeechStart(event) {
    try {
      console.log('onSpeechStart', event);

      this.setState({
        speechState: SPEECH_STATES.SPEECH_RUNNING,
        isLoading: false,
        searchErrorMessage: '',
        arraySearchData: [],
      });
    } catch (e) {
      console.log('onSpeechStart error', e);
    }
  }

  async _onSpeechEnd(event) {
    try {
      console.log('onSpeechEnd', event);
      this.setState({speechState: SPEECH_STATES.SPEECH_ENDED});
    } catch (e) {
      console.log('onSpeechStart error', e);
    }
  }

  async _onSpeechResults(event) {
    try {
      console.log('onSpeechResults', event);
      if (event != null && event != undefined) {
        const {value} = event;
        if (value != null && value != undefined) {
          this.setState({
            speechState: SPEECH_STATES.SPEECH_ENDED,
            arraySpeechResults: value,
          });

          if (!isAndroid()) {
            setTimeout(async () => {
              try {
                await Voice.cancel();
              } catch (e) {}
            }, 2000);
          }
        }
      }
    } catch (e) {}
  }

  //========Voice Search End=========//

  componentWillUnmount() {
    try {
      Voice.destroy();
    } catch (e) {}
  }

  async _resetAllSearchData() {
    this.setState({
      strSearchInput: '',
      arraySearchData: [],

      searchErrorMessage: '',

      isLoading: false,
      isNetworkError: false,
      errorTitle: '',
      errorMsg: '',
      isErrorDialogVisible: false,
    });

    if (this.myInputBoxSearch != null && this.myInputBoxSearch != undefined) {
      this.myInputBoxSearch.hideClearTextCrossIcon();
    }
  }

  async _showLoadingIndicator() {
    this.setState({
      isLoading: true,
      searchErrorMessage: '',
      arraySearchData: [],
    });
  }

  async _hideLoadingIndicator() {
    this.setState({
      isLoading: false,
    });
  }

  _showErrorDialog(isNetworkError = false, errorTitle, errorMsg) {
    this.setState({
      isNetworkError,
      errorTitle,
      errorMsg,
      isLoading: false,
      isErrorDialogVisible: true,
    });
  }

  _removeBackButtonListener() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackButton,
    );
  }
  async componentDidMount() {
    const {navigation} = this.props;

    if (await isNetConnected()) {
      // alert(JSON.stringify(isNetConnected()))
    } else {
      this._showErrorDialog(true);
    }
    this._unsubscribeTabFocusListener = navigation.addListener('focus', () => {
      // do something
      // this.forceUpdate();
    });
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
  }
  componentWillUnmount() {
    this._unsubscribeTabFocusListener();
    this._removeBackButtonListener();
  }

  _handleBackButton() {
    if (this.props.navigation.isFocused()) {
      if (this.state.canBeClosed) {
        // alert('close1');
        RNExitApp.exitApp();

        return (this.state.canBeClosed = false);
      } else {
        setTimeout(() => {
          this.state.canBeClosed = false;
        }, 3000);
        Toast.show('Press Back Button again to exit the app!', Toast.LONG);
        // alert('close2');

        return (this.state.canBeClosed = true);
      }
    }
  }
  async _apiCallSearchContent(strSearchInput) {
    if (await isNetConnected()) {
      this._showLoadingIndicator(true);

      apiCallGet(
        `https://www.googleapis.com/books/v1/volumes?q=${strSearchInput}&max-results=40`,
        this._onSearchContentSuccess,
        this._onSearchContentFailure,
      );
    } else {
      this.setState({
        arraySearchData: [],
        searchErrorMessage: ERROR_NETWORK_MSG,
        isLoading: false,
      });
      this._showErrorDialog(true);
    }
  }

  _onSearchContentApiPromiseReceived(apiPromise) {
    this._currentApiPromise = apiPromise;
  }

  async _onSearchContentSuccess(responseJson) {
    try {
      const jsonDataResponse = responseJson.items;
      if (
        jsonDataResponse != null &&
        jsonDataResponse != undefined &&
        jsonDataResponse.length > 0
      ) {
        this.setState({
          arraySearchData: jsonDataResponse,
          searchErrorMessage: '',
          isLoading: false,
        });
      } else {
        this.setState({
          arraySearchData: [],
          isLoading: false,
          searchErrorMessage:
            'No search results found for "' + searchTextSentInApi + '"',
        });
      }
    } catch (e) {
      this.setState({
        arraySearchData: [],
        isLoading: false,
        searchErrorMessage: '' + e,
      });
    }
  }

  async _onSearchContentFailure() {
    this.setState({
      isLoading: false,
      arraySearchData: [],
      searchErrorMessage: ERROR_GENERAL_MSG,
    });
  }

  _stopCurrentSearchApiCall() {
    try {
      if (
        this._currentApiPromise != null &&
        this._currentApiPromise != undefined
      ) {
      }
    } catch (e) {
      console.log('Exception _stopCurrentSearchApiCall');
      console.log('' + e);
    }
  }

  _onItemClick(item) {
    console.log('iiii', item);
    this.props.navigation.navigate('Details', {
      contentDetailsJson: item,
      otherParam: 'anything you want here',
    });
  }

  _onChangeTextMakeApiCall(strSearchInput) {
    this.setState({strSearchInput});
    this._stopCurrentSearchApiCall();
    setTimeout(async () => {
      if (String(strSearchInput).trim().length >= 2) {
        this._apiCallSearchContent(strSearchInput);
      } else {
        this.setState({
          arraySearchData: [],
          searchErrorMessage: '',
          isLoading: false,
        });
      }
    }, 50);
  }

  async _onSpeakButtonPressed() {
    const {speechState, isVoiceSearchFeatureAvailable} = this.state;
    if (
      speechState == SPEECH_STATES.SPEECH_ENDED ||
      speechState == SPEECH_STATES.SPEECH_YET_TO_BEGIN
    ) {
      if (isVoiceSearchFeatureAvailable) {
        this._initVoiceSearchPermission();
      }
    }
  }

  _renderSpeechResults = () => {
    const {arraySpeechResults, speechState} = this.state;
    return speechState == SPEECH_STATES.SPEECH_ENDED &&
      arraySpeechResults.length > 0 ? (
      <HorizontalVoiceSearchResults
        title={'Suggested Words'}
        arrayData={arraySpeechResults}
        onItemClick={async itemSpeech => {
          const strItemSelectedSpeech = String(itemSpeech).trim();
          if (await isNetConnected()) {
            this.setState({
              arraySpeechResults: [],
              speechState: SPEECH_STATES.SPEECH_YET_TO_BEGIN,
              strSearchInput: strItemSelectedSpeech,
            });
          }
          this._apiCallSearchContent(strItemSelectedSpeech);
        }}
      />
    ) : null;
  };

  _renderSearchBarAndFilterOption = () => {
    const {isVoiceSearchFeatureAvailable} = this.state;
    return (
      <View style={styles.searchInputBoxContainer}>
        {/* Voice Search Button */}
        <View style={styles.voiceSearchbButtonContainer}>
          <TouchableOpacity
            onPress={this._onSpeakButtonPressed}
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
            ref={myInputBoxSearch => (this.myInputBoxSearch = myInputBoxSearch)}
            value={this.state.strSearchInput}
            placeholder={'Search Books'}
            onChangeText={this._onChangeTextMakeApiCall}
            onClearSerchText={() => {
              this.setState({
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

  _renderSearchDataList = () => {
    return (
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        style={styles.flatListStyle}
        data={this.state.arraySearchData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ThumbnailItem item={item} onItemClick={this._onItemClick} />
          //   <Text style={{color: 'red'}}> s</Text>
        )}
        numColumns={2}
        keyExtractor={item => String(item.id) + '_' + String(item.media_type)}
      />
    );
  };

  _renderSpeechListeningIndicator = () => {
    const {speechState} = this.state;
    return speechState == SPEECH_STATES.SPEECH_RUNNING ? (
      <View style={[mStyles.marginTop10, styles.listeningTextContainer]}>
        <Text
          style={[
            eStyles.semiBoldText,
            fStyles.fontSize15,
            {color: colorPrimaryApp},
          ]}>
          Please speak now. Keep your device closer to your mouth...
        </Text>
      </View>
    ) : null;
  };

  _renderLoadingIndicator = () => {
    const {isLoading} = this.state;

    return isLoading ? (
      <ActivityIndicator
        style={mStyles.marginTop15}
        size="large"
        color={colorPrimaryApp}
      />
    ) : null;
  };

  _renderEmptyResultOrError() {
    const {searchErrorMessage, isLoading} = this.state;
    return searchErrorMessage.trim().length > 0 && !isLoading ? (
      <EmptyResultOrError
        additionalContainerStyle={mStyles.marginTop25}
        title={searchErrorMessage}
        iconName={searchErrorMessage == ERROR_GENERAL_MSG ? 'info' : 'search'}
      />
    ) : null;
  }

  render() {
    return (
      <View style={[eStyles.container, eStyles.defaultBackgroundContainer]}>
        <MyStatusBar />
        <View style={[eStyles.container, mStyles.marginTop10]}>
          {this._renderSearchBarAndFilterOption()}
          {this._renderLoadingIndicator()}
          {this._renderSpeechListeningIndicator()}
          {this._renderSpeechResults()}
          {this._renderEmptyResultOrError()}
          {this._renderSearchDataList()}
        </View>
        {/* Dialog Error - For showing network/other errors */}
        <MyDialogError
          isVisible={this.state.isErrorDialogVisible}
          isNetworkError={this.state.isNetworkError}
          errorTitle={this.state.errorTitle}
          errorMsg={this.state.errorMsg}
          onOkPressed={() =>
            this.setState({
              isErrorDialogVisible: false,
            })
          }
        />
      </View>
    );
  }
}
