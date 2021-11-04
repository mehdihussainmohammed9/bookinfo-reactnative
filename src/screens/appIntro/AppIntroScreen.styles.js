import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30rem',
  },

  imageStyle: {
    marginTop: '40rem',
    width: '200rem',
    height: '200rem',
  },

  titleStyle: {
    marginTop: '50rem',
    lineHeight: '25rem',
    fontSize: '18rem',
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '15rem',
  },

  footerButtonContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sliderIndicatorContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.7,
    marginTop: 0,
  },
});
