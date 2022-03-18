import {View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';

export default function ButtonIcon({icon, style, onPress = () => {}}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style}>{icon}</View>
    </TouchableWithoutFeedback>
  );
}
