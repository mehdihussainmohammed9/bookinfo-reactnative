import React, {Component} from 'react';

import PagerView from 'react-native-pager-view';

//import ViewPager from '@react-native-community/viewpager';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './AppIntroScreen.styles';
import SliderDotIndicator from '../../shared/sliderDotIndicator/SliderDotIndicator';
import MyStatusBar from '../../shared/statusBar/MyStatusBar';
import eStyles from '../../styles/MyCommonStyles';
import {colorPrimaryApp} from '../../utils/MyColors';
import fStyles from '../../styles/MyFontStyles';
import {MyUserManager} from '../../managers/MyUserManager';
// import {clearStackAndGoToDashboard} from '../../utils/MyNavigations';
import MyMainLogo from '../../shared/mainLogo/MyMainLogo';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

export default class AppIntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePosition: 0,
      arrayIntro: [
        {
          id: 1,
          title: 'Read any book, novel etc., at one place',
          lottiesrc: require('../../../assets/lottie/app_intro1.json'),
        },
        {
          id: 2,
          title:
            'Get the Author, Pulisher, Rating etc., of any book, novel including the prices',
          lottiesrc: require('../../../assets/lottie/app_intro2.json'),
        },
        {
          id: 3,
          title: 'Read Samples of your favorite book when ever you want. ',
          lottiesrc: require('../../../assets/lottie/app_intro3.json'),
        },
      ],
    };

    this._onSkipNextFinishPressed = this._onSkipNextFinishPressed.bind(this);
  }

  _renderViewPagerItem = item => {
    return (
      <View style={[eStyles.container, styles.contentContainer]}>
        <MyMainLogo />
        <LottieView
          style={styles.imageStyle}
          source={item.lottiesrc}
          autoPlay
          loop
        />

        <Text
          style={[
            eStyles.semiBoldText,
            styles.titleStyle,

            {textAlign: 'center'},
          ]}>
          {item.title}
        </Text>
      </View>
    );
  };

  _renderViewpagerList = () => {
    const {arrayIntro} = this.state;
    const arrayViews = [];
    arrayIntro.forEach(item => {
      arrayViews.push(this._renderViewPagerItem(item));
    });
    return arrayViews;
  };

  async _onSkipNextFinishPressed(isSkipButtonPressed = false) {
    const {arrayIntro, activePosition} = this.state;
    if (isSkipButtonPressed) {
      await MyUserManager.setAppIntroShown();
      // clearStackAndGoToDashboard(this.props);
      this.props.navigation.navigate('Search');
    } else {
      //next or finish is pressed
      const isLastPage = activePosition == arrayIntro.length - 1;
      if (isLastPage) {
        await MyUserManager.setAppIntroShown();
        this.props.navigation.navigate('Search');
      } else {
        this.viewPager.setPage(activePosition + 1);
      }
    }
  }

  render() {
    const {activePosition, arrayIntro} = this.state;
    const isLastPage = activePosition == arrayIntro.length - 1;
    return (
      <View style={[eStyles.container, eStyles.defaultBackgroundContainer]}>
        <MyStatusBar />
        <PagerView
          ref={viewPager => (this.viewPager = viewPager)}
          style={{flex: 0.9}}
          initialPage={0}
          onPageSelected={e => {
            const curPosition = e.nativeEvent.position;
            this.setState({activePosition: curPosition});
          }}
          showPageIndicator={false}>
          {this._renderViewpagerList()}
        </PagerView>

        <View style={[{flex: 0.1}, styles.footer]}>
          <TouchableOpacity
            onPress={() => this._onSkipNextFinishPressed(true)}
            activeOpacity={0.6}
            style={styles.footerButtonContainer}>
            {!isLastPage && (
              <Text
                style={[
                  eStyles.semiBoldText,
                  fStyles.fontSize17,
                  {color: colorPrimaryApp},
                ]}>
                Skip
              </Text>
            )}
          </TouchableOpacity>

          <SliderDotIndicator
            containerStyle={styles.sliderIndicatorContainerStyle}
            activePosition={this.state.activePosition}
            totalIndicatorCount={this.state.arrayIntro.length}
          />

          <TouchableOpacity
            onPress={() => this._onSkipNextFinishPressed(false)}
            activeOpacity={0.6}
            style={styles.footerButtonContainer}>
            <Text
              style={[
                eStyles.semiBoldText,
                fStyles.fontSize17,
                {color: colorPrimaryApp},
              ]}>
              {isLastPage ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
