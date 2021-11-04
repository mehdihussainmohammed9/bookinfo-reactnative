import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import mStyles from '../../styles/MarginStyles';
import eStyles from '../../styles/MyCommonStyles';
import {styles} from './HorizontalVoiceSearchResults.styles';

export default class HorizontalVoiceSearchResults extends Component {
  //Props
  //title
  //arrayData
  //onItemClick(item)

  _renderItem = item => {
    return (
      <View style={{flex: 1 / 3}}>
        <TouchableOpacity
          onPress={() => this.props.onItemClick(item)}
          style={styles.itemContainer}
          activeOpacity={0.6}>
          <Text style={[eStyles.semiBoldText, {textAlign: 'center'}]}>
            {String(item).trim()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {title, arrayData} = this.props;
    return (
      <View style={styles.mainContainer}>
        {/* Title */}
        <Text
          style={[eStyles.semiBoldText, styles.titleText, mStyles.marginTop15]}>
          {title == undefined || title == null ? 'Suggested Words' : title}
        </Text>

        {/* List of words */}
        <FlatList
          data={arrayData}
          renderItem={({item}) => this._renderItem(item)}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item)}
        />
      </View>
    );
  }
}
