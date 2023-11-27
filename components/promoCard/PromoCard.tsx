import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Button from '../button/Button';

const PromoCard = () => {
  return (
    <View
      className="bg-white  rounded-[8px] w-[343px] h-[80px] flex-shrink-0 mt-[18px] pb-12"
      style={styles.cardRadius}>
      <View className="flex flex-row justify-start mb-[24px]">
        <View
          className="w-[80px] h-[80px] bg-[#EB001B] flex   items-center justify-center"
          style={styles.cardRadius}>
          <Text
            className="text-right text-white text-[34px] pr-4 relative  font-[700]"
            style={styles.text}>
            10
          </Text>
          <Text
            className="text-white text-[14px]  font-[700] absolute right-1 w-5"
            style={styles.text}>
            % off
          </Text>
        </View>
        <View>
          <Text
            className="text-[#222] pt-[22px] font-[500] text-[14px] pl-[14px]"
            style={styles.text}>
            Personal Offer
          </Text>
          <Text
            className="text-[#222] text-[11px] italic font-medium pl-[14px]"
            style={styles.text}>
            mypromocode2020
          </Text>
        </View>
        <View className="ml-[47px] mt-2">
          <Text
            className="text-[#222] text-[11px] italic font-medium pl-[14px]"
            style={styles.text}>
            6 days remaining
          </Text>
          <Button
            style={styles.button}
            title="Apply"
            onPress={() => console.log('apply')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 93,
    height: 36,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 7,
    paddingTop: 4,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowColor: 'rgb(211, 38, 38)',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  text: {
    fontFamily: 'CircularStd',
    fontStyle: 'italic',
  },
  cardRadius: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadwo: {
    // opacity: 0.08,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 25,
    elevation: 1,
  },
});
export default PromoCard;
