import React from 'react';
import {View, Text} from 'react-native';
import Container from '../../../../components/Container';

const Orders = () => {
  return (
    <Container isScrollable style={{flex: 1}}>
      <View className="pt-[106px] px-4">
        <Text
          className="text-[#222] text-[34px] font-[700] leading-normal"
          style={{fontFamily: 'CircularStd', fontStyle: 'normal'}}>
          My Orders
        </Text>
      </View>
    </Container>
  );
};

export default Orders;
