import EStyleSheet from 'react-native-extended-stylesheet';
import {colorTextHintPlaceholder} from '../../utils/MyColors';
import {colorPrimaryApp} from '../../utils/MyColors';

export const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: '15rem',
  },

  titleText: {
    color: colorPrimaryApp,
  },

  itemContainer: {
    flex: 1,
    borderRadius: '10rem',
    borderWidth: '1rem',
    borderColor: colorTextHintPlaceholder,
    marginEnd: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '12rem',
    paddingVertical: '6rem',
    marginTop: '10rem',
  },
});
