import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {setCategoryFilter} from '../../state-management/features/filterSlice';
import {useAppDispatch} from '../../state-management/hooks';

type Props = {
  category: string[];
};

type AvailableCategoryType = {
  item: string;
};
const availablecategories = ['women', 'men', 'kids', 'boys', 'girls'];
const CategoryBox = ({category}: Props) => {
  const dispatch = useAppDispatch();

  const handleCategoryChange = (value: string) => {
    dispatch(setCategoryFilter(value));
  };

  // const toggleCategory = (value: string) => {
  //   setSelectedCategory((prevCategory: any) => {
  //     if (prevCategory.includes(value)) {
  //       return prevCategory.filter((category: string) => category !== value);
  //     } else {
  //       return [...prevCategory, value];
  //     }
  //   });
  // };

  const isCategorySelected = (item: string) => category.includes(item);

  const renderCategoryItem = ({item}: AvailableCategoryType) => (
    <Pressable onPress={() => handleCategoryChange(item)} className="pt-6">
      <View
        className={`w-[100px] h-10 mx-4 rounded-[8px] flex border border-[#9B9B9B] flex-row items-center justify-center ${
          isCategorySelected(item)
            ? 'bg-[#DB3022] border-[#ffffff]'
            : 'bg-white'
        }`}>
        <Text
          className={`text-center capitalize text-sm font-medium ${
            isCategorySelected(item) ? 'text-white' : 'text-[#222]'
          }`}
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          {item}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex flex-row items-center justify-center flex-wrap ">
      <FlatList
        data={availablecategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item}
        scrollEnabled={false}
        numColumns={availablecategories.length - 2}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          paddingBottom: 16,
        }}
      />
    </View>
  );
};

export default CategoryBox;
