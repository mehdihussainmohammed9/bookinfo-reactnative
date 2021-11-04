import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
export default class WebViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return <WebView source={{uri: this.props.route.params.url}} />;
  }
}
//https://static.thenounproject.com/png/2185221-200.png