import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './MyDialogInfo.styles';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';
import eStyles from '../../styles/MyCommonStyles';
import mStyles from '../../styles/MarginStyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {colorPrimaryApp, colorTextGreyishWhite} from '../../utils/MyColors';
import MyButton from '../button/MyButton';
import fStyles from '../../styles/MyFontStyles';
import {
  ERROR_GENERAL_MSG,
  ERROR_NETWORK_MSG,
  ERROR_TITLE,
  ERROR_TITLE_NETWORK_ERROR,
} from '../../utils/MyErrorMessages';

export default class MyDialogError extends Component {
  //Props
  //isVisible
  //isNetworkError = if true title and message are fixed for network/internet error
  //errorTitle
  //errorMsg
  //onOkPressed

  _renderNetworkConnectionError = () => {
    return (
      <View style={eStyles.centerContentStyle}>
        <MaterialIcon
          name={'signal-cellular-connected-no-internet-4-bar'}
          size={28 * EStyleSheet.value('$rem')}
          color={colorPrimaryApp}
        />

        <Text
          style={[
            eStyles.boldText,
            mStyles.marginTop5,
            styles.textMsg,
            fStyles.fontSize16,
            styles.textTitle,
          ]}>
          {ERROR_TITLE_NETWORK_ERROR}
        </Text>

        <Text style={[eStyles.boldText, mStyles.marginTop5, styles.textMsg]}>
          {ERROR_NETWORK_MSG}
        </Text>

        <View style={mStyles.marginTop20} />
        <MyButton
          additionalContainerStyle={styles.btnStyle}
          text={'Okay'}
          onClick={() => this.props.onOkPressed()}
        />
      </View>
    );
  };

  _renderGeneralError = () => {
    return (
      <View style={[eStyles.centerContentStyle, styles.box]}>
        {false && (
          <MaterialIcon
            name={'error-outline'}
            size={28 * EStyleSheet.value('$rem')}
            color={colorPrimaryApp}
          />
        )}

        <Text
          style={[
            eStyles.boldText,
            mStyles.marginTop8,
            styles.textMsg,
            fStyles.fontSize25,
            styles.textTitle,
          ]}>
          {this.props.errorTitle == undefined
            ? ERROR_TITLE
            : this.props.errorTitle}
        </Text>

        <Text
          style={[
            eStyles.boldText,
            fStyles.fontSize23,
            mStyles.marginTop5,
            styles.textMsg,
            styles.textGreen,
          ]}>
          {this.props.errorMsg == undefined
            ? ERROR_GENERAL_MSG
            : this.props.errorMsg}
        </Text>

        <Text
          style={[
            eStyles.boldText,
            fStyles.fontSize13,
            mStyles.marginTop5,
            styles.textMsg,
          ]}>
          App Version - 1.0.0
        </Text>

        <View style={mStyles.marginTop20} />
        {/* <MyButton
          additionalContainerStyle={styles.btnStyle}
          text={'Close'}
          onClick={() => this.props.onOkPressed()}
        /> */}
        <TouchableOpacity
          style={[styles.btnStyle]}
          onPress={() => this.props.onOkPressed()}>
          <Text style={[styles.textBlack]}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={this.props.isVisible}>
        <View style={styles.bgBox}>
          {this.props.isNetworkError
            ? this._renderNetworkConnectionError()
            : this._renderGeneralError()}
        </View>
      </Modal>
    );
  }
}
