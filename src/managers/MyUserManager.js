 import AsyncStorage from '@react-native-async-storage/async-storage';

export class MyUserManager {
  static showAppIntro = async () => {
    const appIntroShown = await AsyncStorage.getItem('AppIntroShown');
    return appIntroShown == null || appIntroShown == undefined
      ? true
      : appIntroShown != 'Y';
  };

  static setAppIntroShown = async () => {
    await AsyncStorage.setItem('AppIntroShown', 'Y');
  };
}
