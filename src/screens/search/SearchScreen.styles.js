import EStyleSheet from 'react-native-extended-stylesheet';
import {colorStarYellow, colorBackgroundInputBox} from '../../utils/MyColors';
import {
  colorPrimaryBackgroundTrans,
  colorTextHintPlaceholder,
} from '../../utils/MyColors';
export const styles = EStyleSheet.create({
  searchInputBoxContainer: {
    flexDirection: 'row',
    marginHorizontal: '12rem',
  },

  voiceSearchbButtonContainer: {
    flex: 0.12,
    justifyContent: 'center',
  },

  voiceSearchIconContainer: {
    width: '44rem',
    height: '44rem',
    borderRadius: '22rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colorBackgroundInputBox,
  },

  listeningTextContainer: {
    marginHorizontal: '15rem',
  },

  searchInputOuterContainer: {
    flex: 0.76,
    marginEnd: '7rem',
    marginStart: '7rem',
  },

  filterIconOuterContainer: {
    flex: 0.12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  filterIconContainer: {
    width: '44rem',
    height: '44rem',
    borderRadius: '22rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  filterAppliedDot: {
    width: '6rem',
    height: '6rem',
    borderRadius: '3rem',
    backgroundColor: colorStarYellow,
    position: 'absolute',
    right: '4rem',
    top: '3rem',
  },

  filterIconBackgroundDefault: {
    backgroundColor: colorBackgroundInputBox,
  },

  flatListStyle: {
    marginHorizontal: '12rem',
    marginTop: '10rem',
  },

  thumbnailItemContainer: {
    flex: 1,
    height: '130rem',
    borderRadius: '5rem',
    borderWidth: '0.9rem',
    borderColor: colorTextHintPlaceholder,
    margin: '5rem',
    overflow: 'hidden',
  },

  thumbnailItemImageStyle: {
    width: '100%',
    height: '130rem',
  },

  thumbnailItemTitleContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colorPrimaryBackgroundTrans,
    paddingVertical: '4rem',
    paddingHorizontal: '5rem',
  },
});
