import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Platform, View, Text, Dimensions} from 'react-native';
import {useAppDispatch} from '../../state-management/hooks';
import {setPriceFilter} from '../../state-management/features/filterSlice';

type Props = {
  price: number[];
};
const {width} = Dimensions.get('window');

const Sliders = ({price}: Props) => {
  const dispatch = useAppDispatch();
  const handleValueChange = (value: number[]) =>
    dispatch(setPriceFilter(value));

  return (
    <View className="items-center" style={{width: width * 0.95}}>
      <View
        className="flex flex-row justify-between px-8 items-center"
        style={{width: width * 0.95}}>
        <Text className="text-[#222]">${price[0]}</Text>
        <Text className="text-[#222]">${price[1]}</Text>
      </View>
      <MultiSlider
        markerStyle={{
          ...Platform.select({
            ios: {
              height: 22,
              width: 22,
              shadowColor: '#00000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 1,
              shadowOpacity: 0.1,
            },
            android: {
              height: 22,
              width: 22,
              borderRadius: 50,
              backgroundColor: '#DB3022',
            },
          }),
        }}
        pressedMarkerStyle={{
          ...Platform.select({
            android: {
              height: 22,
              width: 22,
              borderRadius: 20,
              backgroundColor: '#DB3022',
            },
          }),
        }}
        selectedStyle={{
          backgroundColor: '#9B9B9B',
        }}
        trackStyle={{
          backgroundColor: '#9B9B9B',
        }}
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
        values={[price[0], price[1]]}
        sliderLength={280}
        onValuesChange={handleValueChange}
        min={0}
        max={100}
        allowOverlap={false}
        minMarkerOverlapDistance={10}
      />
    </View>
  );
};

export default Sliders;
