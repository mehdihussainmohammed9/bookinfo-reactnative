import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './MyBackButton.styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {colorTextGreyishWhite} from '../../utils/MyColors';
import eStyles from '../../styles/MyCommonStyles';
import fStyles from '../../styles/MyFontStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colorTextMain} from '../../utils/MyColors';

export default class MyBackButton extends Component {
  //Props
  //onClick
  //additionalContainerStyle
  //dropAbsolutePosition = true/false, default false/undefined, if true remove current container style
  //isTransaparentEnclosedButton = default -> false/undefined

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        activeOpacity={0.6}
        style={[
          styles.container,
          this.props.dropAbsolutePosition === true
            ? {}
            : styles.containerAbsolute,
          this.props.isTransaparentEnclosedButton === true
            ? styles.containerTransparentBackButton
            : {},
          this.props.additionalContainerStyle == undefined
            ? {}
            : this.props.additionalContainerStyle,
        ]}>
        <Ionicon
          name="ios-chevron-back-sharp"
          size={20 * EStyleSheet.value('$rem')}
          color={
            this.props.isTransaparentEnclosedButton === true
              ? colorTextMain
              : colorTextGreyishWhite
          }
        />
        <Text
          style={[
            eStyles.boldText,
            fStyles.fontSize12,
            this.props.isTransaparentEnclosedButton === true
              ? styles.textTransparentButtonStyle
              : styles.textStyle,
          ]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  }
}
