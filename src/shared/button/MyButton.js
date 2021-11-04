import React, {Component} from 'react';
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import {styles} from './MyButton.styles';
import eStyles from '../../styles/MyCommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import {
  colorSecondaryApp,
  colorPrimaryApp,
  colorPrimaryAppRipple,
} from '../../utils/MyColors';
import {isAndroid} from '../../utils/MyCommonUtils';
import fStyles from '../../styles/MyFontStyles';
import mStyles from '../../styles/MarginStyles';

export default class MyButton extends Component {
  //Props
  //text = default->Submit
  //onClick
  //additionalContainerStyle
  //gradientColors => array of hex colors, default will be purple and pink button

  _renderIosButton = () => {
    return (
      <TouchableHighlight
        underlayColor={colorPrimaryAppRipple}
        style={styles.containerButton}
        onPress={() => this.props.onClick()}>
        <Text style={[eStyles.boldText]}>
          {this.props.text == undefined ? 'Submit' : this.props.text}
        </Text>
      </TouchableHighlight>
    );
  };

  _renderAndroidButton = () => {
    return (
      <View style={styles.containerButton}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(colorPrimaryAppRipple)}
          onPress={() => this.props.onClick()}>
          {this.props.Strikethrough ? (
            <View style={styles.containerButtonStrikethrough}>
              <Text
                style={[
                  eStyles.semiBoldTextWithBlackText,
                  fStyles.fontSize15,
                  this.props.Strikethrough ? eStyles.textStrikethrough : '',
                ]}>
                {this.props.StrikethroughText == undefined
                  ? ' '
                  : this.props.StrikethroughText}
              </Text>
              <Text
                style={[
                  eStyles.boldTextWithBlackText,
                  fStyles.fontSize15,
                  mStyles.marginLeft6,
                ]}>
                {this.props.text == undefined ? ' ' : this.props.text}
              </Text>
            </View>
          ) : (
            <View style={styles.containerButton}>
              <Text style={[eStyles.boldTextWithBlackText, fStyles.fontSize15]}>
                {this.props.text == undefined ? ' ' : this.props.text}
              </Text>
            </View>
          )}
        </TouchableNativeFeedback>
      </View>
    );
  };

  render() {
    return (
      <LinearGradient
        colors={
          this.props.gradientColors == undefined
            ? [colorSecondaryApp, colorPrimaryApp, colorPrimaryApp]
            : this.props.gradientColors
        }
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={[
          styles.containerGradient,
          this.props.additionalContainerStyle == undefined
            ? {}
            : this.props.additionalContainerStyle,
        ]}>
        {isAndroid() ? this._renderAndroidButton() : this._renderIosButton()}
      </LinearGradient>
    );
  }
}
