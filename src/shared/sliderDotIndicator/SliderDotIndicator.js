import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './ImageSlider.styles';

export default class SliderDotIndicator extends Component {
  //Props
  //totalIndicatorCount
  //activePosition
  //containerStyle

  render() {
    const {totalIndicatorCount, activePosition} = this.props;
    const arrayDotIndicatorViews = [];

    for (let index = 0; index < totalIndicatorCount; index++) {
      arrayDotIndicatorViews.push(
        <View
          style={
            index == activePosition
              ? styles.dotIndicatorActive
              : styles.dotIndicatorDefault
          }
        />,
      );
    }

    return (
      <View
        style={[
          styles.dotIndicatorContainer,
          this.props.containerStyle == undefined
            ? {}
            : this.props.containerStyle,
        ]}>
        {arrayDotIndicatorViews}
      </View>
    );
  }
}
