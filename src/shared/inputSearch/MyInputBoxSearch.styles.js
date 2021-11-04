import EStyleSheet from 'react-native-extended-stylesheet';
import {
  colorTextMain,
  colorPrimaryApp,
  colorBackgroundInputBox,
} from '../../utils/MyColors';
import {isAndroid} from '../../utils/MyCommonUtils';

export const styles = EStyleSheet.create({
  inputBoxTextStyle: {
    marginHorizontal: '10rem',
    color: colorTextMain,
  },

  containerInputBox: {
    borderRadius: '25rem',
    paddingHorizontal: '12rem',
    paddingVertical: isAndroid() ? '8rem' : '11rem',
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerInputBoxDefault: {
    backgroundColor: colorBackgroundInputBox,
  },

  containerInputBoxHighlight: {
    backgroundColor: 'rgba(25, 117, 52)',
    borderColor: colorPrimaryApp,
    borderWidth: '0.8rem',
  },

  containerIconSearch: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
