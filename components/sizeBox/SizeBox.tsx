import React from 'react';
import {View, Text, Pressable, FlatList, Dimensions} from 'react-native';
import {setSizeFilter} from '../../state-management/features/filterSlice';
import {useAppDispatch} from '../../state-management/hooks';
type Props = {
  size: string[];
  width: string;
  height: string;
};
type AvailableSizeType = {
  item: string;
};

const {width} = Dimensions.get('window');
const deviceWidth = width;
const availableSizes = ['xs', 's', 'm', 'l', 'xl'];
const SizesBox = ({size, width, height}: Props) => {
  const dispatch = useAppDispatch();

  const toggleSize = (value: string) => {
    dispatch(setSizeFilter(value));
  };

  const isSizeSelected = (item: string) => size.includes(item);

  const renderSizeItem = ({item}: AvailableSizeType) => (
    <Pressable onPress={() => toggleSize(item)} className="pt-6">
      <View
        className={`w-[${width}] h-[${height}] mx-4 rounded-[8px] flex border border-[#9B9B9B]  items-center  justify-center ${
          isSizeSelected(item) ? `bg-[#DB3022] border-[#ffffff]` : `bg-white`
        }`}>
        <Text
          className={`text-center text-sm font-medium ${
            isSizeSelected(item) ? 'text-white' : 'text-[#222]'
          }`}
          style={{fontFamily: 'CircularStd', fontStyle: 'normal'}}>
          {item}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View>
      <FlatList
        data={availableSizes}
        renderItem={renderSizeItem}
        keyExtractor={item => item.indexOf.toString()}
        numColumns={availableSizes.length - 2}
        // contentContainerStyle={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   flexDirection: 'row',
        //   justifyContent: 'center',
        //   width: deviceWidth * 0.95,
        // }}
      />
    </View>
  );
};

export default SizesBox;
