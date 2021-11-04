import EStyleSheet from 'react-native-extended-stylesheet';
import {colorBlackTransContentImageOverlay} from '../../utils/MyColors';

import {
  colorBackgroundInputBox,
  colorPrimaryBackgroundTrans,
  colorTextRed,
  colorTextHintPlaceholder,
  colorPrimaryApp,
} from '../../utils/MyColors';

const HEADER_MAIN_CONTAINER_HEIGHT = '440rem';
const IMAGE_HEIGHT = '400rem';

export const styles = EStyleSheet.create({
  headerMainContainer: {
    height: HEADER_MAIN_CONTAINER_HEIGHT,
  },

  headerImageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'absolute',
  },

  headerBackgroundImageStyle: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'absolute',
  },

  headerBackgroundImageOverlay: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: colorBlackTransContentImageOverlay,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerImageThumbnailStyle: {
    width: '192.5rem',
    height: '288.75rem',
    borderRadius: '8rem',
  },

  headerContentContainer: {
    paddingHorizontal: '15rem',
    paddingTop: '6rem',
    marginTop: '370rem',
  },

  headerTitleTextStyle: {
    lineHeight: '22rem',
  },

  headerGenreTextStyle: {
    color: colorTextRed,
  },

  imdbImageStyle: {
    width: '40rem',
    height: '14rem',
    marginEnd: '3rem',
  },

  headerStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerStarRatingTextStyle: {
    color: colorTextHintPlaceholder,
    marginStart: '4rem',
  },

  headerSubInfoMarginStart: {
    marginStart: '9rem',
  },

  optionsShareWatchContainer: {
    marginHorizontal: '15rem',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '10rem',
    backgroundColor: colorBackgroundInputBox,
    borderColor: colorTextHintPlaceholder,
    borderWidth: '1rem',
    borderRadius: '8rem',
    flexDirection: 'row',
    overflow: 'hidden',
  },

  optionsShareWatchItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  availableOnItemContainer: {
    marginStart: '5rem',
    marginEnd: '4rem',
    width: '72rem',
    paddingVertical: '15rem',
    alignItems: 'center',
  },

  availableOnItemSubscribeBuyRentContainer: {
    paddingHorizontal: '10rem',
    paddingVertical: '6rem',
    borderWidth: '0.8rem',
    borderRadius: '7rem',
    borderColor: colorPrimaryApp,
  },

  availableOnItemSubscribeBuyRentTextStyle: {
    color: colorPrimaryApp,
  },

  availableOnItemIcon: {
    width: '54rem',
    height: '54rem',
  },

  aboutSectionContainer: {
    marginHorizontal: '15rem',
  },
  aboutPricingContainer: {
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceButton: {
    alignSelf: 'flex-start',
    minWidth: '48%',
  },

  aboutContentTextStyle: {
    lineHeight: '18rem',
  },

  releaseYearLanguagesDurationMainContainer: {
    marginHorizontal: '15rem',
  },

  releaseYearLanguagesDurationItemContainer: {
    flexDirection: 'row',
  },

  releaseYearLanguagesDurationTitleTextStyle: {
    color: colorTextHintPlaceholder,
  },

  castCrewTitleTextStyle: {
    marginHorizontal: '15rem',
  },

  castCrewDesignationTypeTextStyle: {
    color: colorTextHintPlaceholder,
  },

  castCrewItemContainer: {
    marginStart: '15rem',
    marginEnd: '4rem',
    width: '120rem',
  },

  castCrewImageStyle: {
    width: '120rem',
    height: '150rem',
    borderRadius: '5rem',
  },

  castCrewImagePlaceholderStyle: {
    width: '120rem',
    height: '150rem',
    borderRadius: '5rem',
    borderWidth: '1.5rem',
    borderColor: colorTextHintPlaceholder,
    alignItems: 'center',
    justifyContent: 'center',
  },

  readMoreTextStyle: {
    color: colorPrimaryApp,
  },
});
