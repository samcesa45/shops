import React from 'react';
import {View, Image, Text, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {selectAllBrands} from '../../state-management/features/brandSlice';
import {useAppSelector} from '../../state-management/hooks';

import {productType} from '../../type/model';
import StarRating from '../starRating';

type Props = {
  toggle: boolean;
  numColumns: number;
  filteringProducts: productType[];
  sortedProductCategory: productType[];
  activeFilter: boolean;
};

const {width} = Dimensions.get('window');

const Grid = ({
  numColumns,
  toggle,
  sortedProductCategory,
  filteringProducts,
  activeFilter,
}: Props) => {
  const brands = useAppSelector(selectAllBrands);
  const getBrandName = (brand_id: string) => {
    const brand = brands.find(brand => brand.id === brand_id);
    return brand ? brand.name : 'unknown brand';
  };
  return (
    <View className="mt-4 rounded-[8px]  flex flex-row">
      <FlatList
        data={activeFilter ? sortedProductCategory : filteringProducts}
        contentContainerStyle={{
          marginHorizontal: 20,
          justifyContent: 'space-between',
          paddingBottom: 300,
        }}
        style={{
          height: width * 2,
          width: width / 2,
        }}
        renderItem={({item}) => (
          <View
            className={` rounded-[8px] mr-4  ${
              toggle ? 'flex-row items-center' : ' flex-col w-[164px] h-[260px]'
            }  mb-8  bg-white`}
            key={item.id}
            style={{elevation: 1}}>
            <Image
              source={{uri: item.image_url}}
              alt={item.name}
              className="w-[164px] h-[157px] relative"
              style={{
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 0,
              }}
            />
            <View className="pl-4 ">
              <Text
                className="text-[#222] text-[16px] capitalize font-[450] leading-normal"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                {item.name}
              </Text>
              <Text
                className="text-[#9B9B9B] text-[11px] font-[450] leading-normal tracking-[-0.017px]"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                {getBrandName(item.brand_id)}
              </Text>
              <View className="flex flex-row items-center mt-[5px]">
                {/* <Icon
                  name="star"
                  size={14}
                  color="#FFBA49"
                  style={{width: 14, height: 14}}
                /> */}
                <StarRating rating={item.rating_score} />
                <Text
                  className="text-[#9B9B9B] text-[10px]   font-[450] leading-normal"
                  style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                  ({item.final_total_rating})
                </Text>
              </View>
              <Text
                className="text-[#222] font-medium text-sm pt-[8px]"
                style={{fontFamily: 'CircularStd', fontStyle: 'normal'}}>
                ${item.final_unit_price}
              </Text>
            </View>
            <View
              className="w-9 h-9 bg-white flex flex-row items-center  justify-center rounded-full shadow-lg absolute -bottom-2 -right-1"
              style={{elevation: 5, shadowColor: '#222'}}>
              <Icons name="favorite-border" color="#9B9B9B" />
            </View>
          </View>
        )}
        key={numColumns}
        // keyExtractor={(item) => item.id!}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Grid;
