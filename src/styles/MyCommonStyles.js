import EStyleSheet from 'react-native-extended-stylesheet';
import {
  colorTextMain,
  colorPrimaryBackground,
  colorTextBlack,
} from '../utils/MyColors';
import {
  getScreenWidth,
  getScreenHeight,
  isAndroid,
} from '../utils/MyCommonUtils';
import {FONTS} from '../utils/MyFontNames';

const eStyles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  defaultBackgroundContainer: {
    backgroundColor: colorPrimaryBackground,
  },
  containerAbsolute: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },

  footerSectionLoginRegisterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: '20rem',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '10rem',
  },
  centerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenWidthHeight: {
    width: getScreenWidth(),
    height: getScreenHeight(),
  },
  boldText: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: '14rem',
    color: colorTextMain,
  },
  semiBoldText: {
    fontFamily: FONTS.FONT_SEMI_BOLD,
    fontSize: '14rem',
    color: colorTextMain,
  },
  boldTextWithBlackText: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: '14rem',
    color: colorTextBlack,
  },
  semiBoldTextWithBlackText: {
    fontFamily: FONTS.FONT_SEMI_BOLD,
    fontSize: '14rem',
    color: colorTextBlack,
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
  },
});

export default eStyles;
