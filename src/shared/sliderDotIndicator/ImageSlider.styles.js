import EStyleSheet from 'react-native-extended-stylesheet';
import {colorPrimaryBackgroundTrans} from '../../utils/MyColors';

import {FONTS} from '../../utils/MyFontNames';

import {
  colorTextHintPlaceholder,
  colorBlackTrans2,
  colorPrimaryApp,
} from '../../utils/MyColors';

export const styles = EStyleSheet.create({
  mainPagerContainer: {
    width: '100%',
    height: '230rem',
  },
  textOnImage: {
    flex: 1,
    justifyContent: 'center',
  },
  titleOnImage: {
    color: 'white',
    fontFamily: FONTS.FONT_SEMI_BOLD,
    fontSize: '18rem',
  },
  itemImageStyle: {
    width: '100%',
    height: '300rem',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  linearGradientView: {
    width: '75%',
    height: '20%',
    justifyContent: 'center',
  },
  itemTitleAndIndicatorContainer: {
    position: 'absolute',
    left: 0,
    paddingStart: '15rem',
    paddingEnd: '110rem',
    paddingTop: '6rem',
    bottom: '0rem',
    right: 0,
    backgroundColor: colorPrimaryBackgroundTrans,
  },

  dotIndicatorContainer: {
    flexDirection: 'row',
    marginHorizontal: '15rem',
    marginTop: '15rem',
  },

  dotIndicatorDefault: {
    width: '7rem',
    height: '7rem',
    borderRadius: '3.5rem',
    backgroundColor: colorTextHintPlaceholder,
    marginHorizontal: '4rem',
  },

  dotIndicatorActive: {
    width: '7rem',
    height: '7rem',
    borderRadius: '3.5rem',
    backgroundColor: colorPrimaryApp,
    marginHorizontal: '4rem',
  },
});
