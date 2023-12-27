import React from 'react';
import {View} from 'react-native';

type Props = {
  children: JSX.Element[] | JSX.Element;
  className: string;
};

const Card = ({children, className, ...props}: Props) => {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
};

export default Card;
