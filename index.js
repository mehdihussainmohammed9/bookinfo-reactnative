/**
 * @format
 */

import {AppRegistry, Dimensions, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import EStyleSheet from 'react-native-extended-stylesheet';
import {getScreenWidth, getScreenHeight} from './src/utils/MyCommonUtils';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

AppRegistry.registerComponent(appName, () => {
  const {width} = Dimensions.get('window');

  // calculate rem variable
  var rem = 1;
  if (getScreenWidth() < getScreenHeight()) {
    if (width >= 800) {
      rem = 1.45;
    } else if (width >= 600) {
      rem = 1.25;
    } else if (width >= 414) {
      rem = 1.05;
    } else if (width >= 300) {
      rem = 1;
    } else if (width >= 240) {
      rem = 0.9;
    }
  }

  EStyleSheet.build({
    $rem: rem,
  });

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  console.disableYellowBox = true;

  return App;
});
