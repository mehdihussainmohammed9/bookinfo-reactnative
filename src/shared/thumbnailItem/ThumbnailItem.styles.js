import EStyleSheet from 'react-native-extended-stylesheet';
import {
  colorTextHintPlaceholder,
  colorPrimaryApp,
  colorPrimaryBackground,
} from '../../utils/MyColors';

export const styles = EStyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: '5rem',
    borderWidth: '0.9rem',
    borderColor: colorTextHintPlaceholder,
    margin: '9rem',
    overflow: 'hidden',
    backgroundColor: colorPrimaryBackground,
  },

  itemImageStyle: {
    width: '100%',
    height: '230rem',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemTextContainer: {
    padding: '7rem',
    overflow: 'hidden',
  },

  iconOptionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '6rem',
    right: '6rem',
    alignSelf: 'flex-end',
  },

  iconItemContainer: {
    width: '27rem',
    height: '27rem',
    borderRadius: '5rem',

    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: '6rem',

    borderWidth: '0.9rem',
    borderColor: colorTextHintPlaceholder,
  },

  iconItemContainerColorDefault: {
    borderColor: colorTextHintPlaceholder,
  },

  iconItemContainerColorSelected: {
    borderColor: colorPrimaryApp,
  },
});
