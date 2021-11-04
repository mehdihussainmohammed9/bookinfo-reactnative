import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import eStyles from '../../styles/MyCommonStyles';

import MyStatusBar from '../../shared/statusBar/MyStatusBar';
import MyMainLogo from '../../shared/mainLogo/MyMainLogo';
import {MyUserManager} from '../../managers/MyUserManager';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorDialogVisible: false,
      isNetworkError: false,
    };

    this._skipThisScreen = this._skipThisScreen.bind(this);
  }
  componentDidMount() {
    setTimeout(this._skipThisScreen, 2000);
  }
  async _skipThisScreen() {
    const self = this;
    self._navigateToNextScreen();
  }

  _navigateToNextScreen = async () => {
    if (await MyUserManager.showAppIntro()) {
      this.props.navigation.navigate('AppIntro');
    } else {
      this.props.navigation.navigate('Search');
    }
  };

  render() {
    return (
      <View style={eStyles.container}>
        <MyStatusBar />
        <View
          style={[
            eStyles.container,
            {justifyContent: 'center', backgroundColor: 'black'},
          ]}>
          <MyMainLogo />
        </View>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: 76, height: 68}}
            source={{
              uri: 'https://static.thenounproject.com/png/2185221-200.png',
            }}
          />
          <Text>Splash Screen</Text>
        </View> */}
      </View>
    );
  }
}
