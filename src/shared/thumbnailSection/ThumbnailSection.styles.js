import EStyleSheet from 'react-native-extended-stylesheet';
import {colorPrimaryApp} from 'utils/MyColors';
import {colorPrimaryAppTransRipple} from 'utils/MyColors';
import {colorBackgroundInputBox} from 'utils/MyColors';
import {
  colorPrimaryBackground,
  colorTextHintPlaceholder,
  colorPrimaryBackgroundTrans,
  colorBlackTrans,
} from 'utils/MyColors';

export const styles = EStyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: '15rem',
  },

  headerTitle: {
    flex: 0.7,
  },

  headerSeeAllContainer: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  headerSeeAllText: {
    color: colorTextHintPlaceholder,
  },

  flatListStyle: {
    paddingBottom: '10rem',
  },

  userActivitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    width: '148rem',
    borderRadius: '5rem',
    borderWidth: '0.9rem',
    borderColor: colorTextHintPlaceholder,
    marginStart: '15rem',
    marginEnd: '5rem',
    overflow: 'hidden',
    backgroundColor: colorPrimaryBackground,
  },

  itemContainerYouTube: {
    width: '220rem',
    borderRadius: '5rem',
    borderWidth: '0.9rem',
    borderColor: colorTextHintPlaceholder,
    marginStart: '15rem',
    marginEnd: '5rem',
    overflow: 'hidden',
    backgroundColor: colorPrimaryBackground,
  },

  itemImageStyle: {
    width: '100%',
    height: '200rem',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemImageStyleYouTube: {
    width: '100%',
    height: '120rem',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemStarAndRatingContainer: {
    flexDirection: 'row',
    marginVertical: '1rem',
    alignItems: 'center',
    marginHorizontal: '3rem',
  },

  itemStarRatingNotGivenContainer: {
    width: '27rem',
    height: '27rem',
    borderRadius: '5rem',
    borderWidth: '0.9rem',
    borderColor: colorTextHintPlaceholder,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '3rem',
  },

  itemStarRatingTextStyle: {
    color: colorTextHintPlaceholder,
  },

  itemTextContainer: {
    padding: '7rem',
    overflow: 'hidden',
  },

  iconItemContainer: {
    width: '27rem',
    height: '27rem',
    borderRadius: '5rem',

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '3rem',

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
