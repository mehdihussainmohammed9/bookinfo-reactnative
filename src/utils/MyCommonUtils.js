import {Platform, Dimensions} from 'react-native';
export const rsSymbol = '₹';

export function getScreenWidth() {
  return Dimensions.get('window').width;
}

export function getScreenHeight() {
  return Dimensions.get('window').height;
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isIos() {
  return Platform.OS === 'ios';
}

export function isJsonEmpty(json) {
  return JSON.stringify(json) === '{}';
}

export function isString(obj) {
  return obj !== undefined && obj !== null && obj.constructor == String;
}

export function getEmptyIfNull(field) {
  return field == null ||
    field == undefined ||
    field == 'null' ||
    field.toString().trim().length < 1
    ? ''
    : field.toString().trim();
}
