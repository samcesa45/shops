import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useAppSelector} from '../../state-management/hooks';
import {selectAllCategories} from '../../state-management/features/categoriesSlice';

const CustomDrawerContent = ({navigation}: any) => {
  const categories = useAppSelector(selectAllCategories);

  return (
    <DrawerContentScrollView>
      <View className="w-[90%] mt-[104px] ml-4 shrink-0 h-12 rounded-[25px] bg-[#DB3022] shadow-2xl flex items-center flex-row justify-center">
        <Pressable onPress={() => console.log('hello')}>
          <Text className="text-white uppercase text-sm font-medium">
            View All Items
          </Text>
        </Pressable>
      </View>
      <View className="mt-4 ml-[19px]">
        <Text
          className="text-sm text-[#9B9B9B] font-medium"
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          Choose category
        </Text>
      </View>
      <View className="mt-8 text-center">
        {categories.map(item => (
          <View
            key={item.id}
            className="pt-[15px] pb-[12px] "
            style={{
              borderTopWidth: 1,
              borderTopColor: 'rgba(155,155,1,0.25)',
            }}>
            <Pressable
              android_ripple={{
                color: '#9B9B9B',
                borderless: true,
              }}
              onPress={() =>
                navigation.navigate('CategoryDetails', {
                  categoryId: item.id,
                  parentId: item.parent_id,
                })
              }>
              <Text
                className="text-[#222] text-[16px] ml-[40px]  leading-normal font-medium"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                {item.name ? item.name : 'noname'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
