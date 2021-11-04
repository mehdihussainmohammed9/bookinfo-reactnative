import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isAndroid} from '../../utils/MyCommonUtils';
import {colorPrimaryBackground} from '../../utils/MyColors';

export default class MyStatusBar extends Component {
  _renderAndroidStatusBar = () => {
    return (
      <StatusBar
        backgroundColor={colorPrimaryBackground}
        barStyle="light-content"
      />
    );
  };

  _renderIosStatusBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: getStatusBarHeight(),
          backgroundColor: colorPrimaryBackground,
        }}>
        <StatusBar
          backgroundColor={colorPrimaryBackground}
          barStyle="light-content"
        />
      </View>
    );
  };

  render() {
    return isAndroid()
      ? this._renderAndroidStatusBar()
      : this._renderIosStatusBar();
  }
}
