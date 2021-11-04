import React, {Component} from 'react';
import MyButton from '../button/MyButton';
import {
  colorBlackGradient1,
  colorLightestGrey,
  colorBlackGradient2,
} from '../../utils/MyColors';

export default class MyButtonBlackGradient extends Component {
  //Props
  //text = default->Submit
  //onClick
  //additionalContainerStyle
  //additionalTextStyle

  render() {
    return (
      <MyButton
        {...this.props}
        gradientColors={[
          colorBlackGradient1,
          colorLightestGrey,
          colorBlackGradient2,
        ]}
      />
    );
  }
}
