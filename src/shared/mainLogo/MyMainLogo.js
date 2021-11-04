import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';
import {styles} from './MyMainLogo.styles';
import {Image} from 'react-native';

export default class MyMainLogo extends Component {
  //Props
  //useSmallStyle
  //useUltraSmallStyle

  render() {
    return (
      <Image
        style={
          this.props.useUltraSmallStyle === true
            ? styles.mainLogoUltraSmallImageStyle
            : this.props.useSmallStyle === true
            ? styles.mainLogoSmallImageStyle
            : styles.mainLogoImageStyle
        }
        source={require('../../../assets/images/logo.jpg')}
      />
    );
  }
}
