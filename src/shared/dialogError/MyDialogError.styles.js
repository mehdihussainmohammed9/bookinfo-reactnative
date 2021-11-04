import EStyleSheet from 'react-native-extended-stylesheet';
import {
  colorPrimaryBackground,
  colorPrimaryApp,
  colorTextGreyishWhite,colorTextRed
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
  },
  textTitle: {
    color: colorTextRed,
  },
  textMsg: { 
    width: '250rem',
    marginHorizontal: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: '17rem',
  },
  btnStyle: {
    width: '100rem',
  },
});
