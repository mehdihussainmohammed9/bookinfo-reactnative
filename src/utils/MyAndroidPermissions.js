import React from 'react';
import {PermissionsAndroid} from 'react-native';

export const PERMISSION_ERROR_TITLE = 'Permission Denied';
export const PERMISSION_ERROR_MSG =
  'Camera/Gallery Permission denied, please grant permissions through app settings';

export const PERMISSION_ERROR_RECORD_AUDIO =
  'Record Audio permission denied, please grant permissions through app settings';

export function requestRecordAudioPermission(
  onPermissionGranted,
  neverAskAgainTriggered,
) {
  const audioPermission = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
  PermissionsAndroid.requestMultiple(audioPermission).then(result => {
    console.log('ResultPermissions', result);
    if (result['android.permission.RECORD_AUDIO'] === 'granted') {
      onPermissionGranted();
    } else {
      console.log('PermissionDenied', result);
      if (isNeverAskAgain(result)) {
        neverAskAgainTriggered(PERMISSION_ERROR_RECORD_AUDIO);
      }
    }
  });
}

function isNeverAskAgain(result) {
  const array = Object.values(result).filter(value => {
    return value === 'never_ask_again';
  });
  return array.length > 0;
}
