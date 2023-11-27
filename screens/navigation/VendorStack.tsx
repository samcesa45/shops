import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
// import CheckSale from "../vendors/home/CheckSale";
// import Vendors from "../vendors/home";
import VendorTabs from './tabs/VendorTabs';
import ShopIndex from '../vendors/shop';
import Product from '../vendors/shop/Product';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Bag from '../vendors/bag';

const Stack = createNativeStackNavigator();
const VendorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Vendor"
        component={VendorTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Shop" component={ShopIndex} />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}) => ({
          headerTitle: () => (
            <View className="flex flex-row justify-center items-center text-center">
              <Text
                className="text-[#222] font-medium capitalize text-[18px] leading-[22px]"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                {route?.params?.name}
              </Text>
            </View>
          ),
          headerRight: () => <Icon name="share" color="#222" size={24} />,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen name="Bag" component={Bag} />
    </Stack.Navigator>
  );
};

export default VendorStack;
