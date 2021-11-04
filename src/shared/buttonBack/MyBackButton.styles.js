import EStyleSheet from 'react-native-extended-stylesheet';
import {
  colorTextMain,
  colorTextGreyishWhite,
  colorPrimaryBackgroundTrans,
} from '../../utils/MyColors';

export const styles = EStyleSheet.create({
  containerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '10rem',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textStyle: {
    color: colorTextGreyishWhite,
  },

  containerTransparentBackButton: {
    backgroundColor: colorPrimaryBackgroundTrans,
    borderRadius: '10rem',
    paddingVertical: '7rem',
    paddingStart: '5rem',
    paddingEnd: '12rem',
  },

  textTransparentButtonStyle: {
    color: colorTextMain,
  },
});
