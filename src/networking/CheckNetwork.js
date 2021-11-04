import NetInfo from '@react-native-community/netinfo';

export const isNetConnected = async () => {
  const state = await NetInfo.fetch();
  console.log('=====Network Connection=====');
  console.log('Is connected?', state.isConnected);

  return true;
};
