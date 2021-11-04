import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './MyInputBoxSearch.styles';
import {colorTextHintPlaceholder, colorTextMain} from '../../utils/MyColors';
import eStyles from '../../styles/MyCommonStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {colorPrimaryApp} from '../../utils/MyColors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class MyInputBoxSearch extends Component {
  //Props
  //value
  //placeholder
  //onChangeText(value)
  //isPassword = default -> false
  //maxLength = default -> 50
  //isNumberKeyboard
  //isEditable = default => true/undefined
  //returnKeyType = default "done"

  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
      isPasswordVisible: false,
      isClearSearchTextVisible: false,
    };

    this.hideClearTextCrossIcon = this.hideClearTextCrossIcon.bind(this);
  }

  hideClearTextCrossIcon() {
    this.setState({isClearSearchTextVisible: false});
  }

  render() {
    const {isClearSearchTextVisible} = this.state;
    return (
      <View
        style={[
          styles.containerInputBox,
          this.state.isFocussed ||
          (this.props.isEditable === false &&
            String(this.props.value).length > 0)
            ? styles.containerInputBoxHighlight
            : styles.containerInputBoxDefault,
        ]}>
        <View style={styles.containerIconSearch}>
          <FeatherIcon
            name={'search'}
            color={
              this.state.isFocussed ? colorPrimaryApp : colorTextHintPlaceholder
            }
            size={20 * EStyleSheet.value('$rem')}
          />
        </View>

        <TextInput
          value={this.props.value}
          autoCapitalize={'none'}
          editable={
            this.props.isEditable == undefined ? true : this.props.isEditable
          }
          autoCorrect={false}
          maxLength={
            this.props.maxLength == undefined ? 50 : this.props.maxLength
          }
          style={[
            {padding: 0, flex: isClearSearchTextVisible ? 0.8 : 0.9},
            eStyles.boldText,
            styles.inputBoxTextStyle,
          ]}
          onFocus={e => this.setState({isFocussed: true})}
          onBlur={e => this.setState({isFocussed: false})}
          onChangeText={value => {
            this.setState({
              isClearSearchTextVisible: String(value).trim().length > 0,
            });

            this.props.onChangeText(value);
          }}
          placeholderTextColor={colorTextHintPlaceholder}
          placeholder={this.props.placeholder}
          keyboardType={
            this.props.isNumberKeyboard === true
              ? 'numeric'
              : this.props.isPassword == undefined
              ? 'email-address'
              : 'default'
          }
          returnKeyType={
            this.props.returnKeyType == undefined
              ? 'done'
              : this.props.returnKeyType
          }
        />

        {isClearSearchTextVisible && (
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isClearSearchTextVisible: false,
              });
              this.props.onClearSerchText();
            }}
            activeOpacity={0.7}
            style={styles.containerIconSearch}>
            <Ionicon
              name={'close'}
              color={colorPrimaryApp}
              size={24 * EStyleSheet.value('$rem')}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
