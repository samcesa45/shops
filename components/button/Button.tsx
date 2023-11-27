import React from 'react';
import {Pressable, Text, View} from 'react-native';

type Props = {
  title: string;
  style: object;
  onPress: () => void;
};

const Button = ({title, style, onPress}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={style}>
        <Text style={style}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
