import EStyleSheet from 'react-native-extended-stylesheet';
import {
  colorPrimaryBackground,
  colorPrimaryApp,
  colorTextRed,
  colorWhite,
} from '../../utils/MyColors';

export const styles = EStyleSheet.create({
  bgBox: {
    width: '280rem',
    paddingTop: '15rem',
    paddingBottom: '20rem',
    paddingHorizontal: '20rem',
    backgroundColor: colorPrimaryBackground,
    borderRadius: '8rem',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colorPrimaryApp,
    borderWidth: '0.9rem',
    height: '170rem',
  },
  textTitle: {
    color: colorWhite,
  },
  textGreen: {
    color: colorPrimaryApp,
  },
  textMsg: {
    width: '250rem',
    marginHorizontal: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: '27rem',
  },
  brandName: {
    width: '250rem',
    marginHorizontal: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: '35rem',
  },
  btnStyle: {
    width: '50rem',
    height: '30rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPrimaryApp,
    borderRadius: '8rem',
    borderWidth: '0.9rem',
  },
  box: {},
});
