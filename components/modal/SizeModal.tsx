import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import SizesBox from '../sizeBox/SizeBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../state-management/hooks';
import {filters} from '../../state-management/features/filterSlice';
import axios from 'axios';
import {
  addToCart,
  getAllCartItems,
  selectAllCartItems,
} from '../../state-management/features/cartItemSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cartItemType} from '../../type/model';

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  productId: string;
};
const {width} = Dimensions.get('window');

const deviceWidth =
  Platform.OS === 'ios'
    ? Dimensions.get('window').width
    : ExtraDimensions.get('REAL_WINDOW_WIDTH');
const SizeModal = ({modalVisible, setModalVisible, productId}: Props) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(filters);
  const cartItems = useAppSelector(selectAllCartItems);

  const {size, color} = filter;
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (productId: string) => {
    dispatch(addToCart(cartItems));
    console.log('added', cartItems);
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('token no found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    };
    const body: cartItemType = {
      id: '',
      product_id: productId,
      qty: 1,
      qty_uom: 'kg',
      final_unit_price: 0,
      status: 'added',
      unit_discount_pct: 0.25,
    };
    try {
      const response = await axios.post(
        `https://75e0-105-112-116-49.ngrok-free.app/api/v1/cart-items`,
        body,
        {headers}
      );
      console.log('added to cart', response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    dispatch(getAllCartItems())
      .unwrap()
      .then(result => {
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={modalVisible}
        deviceWidth={deviceWidth}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <View className="flex flex-row justify-center mt-3.5">
            <View className="w-[60px] h-[6px] bg-[#9B9B9B] rounded-[3px]"></View>
          </View>
          <Text
            className="text-center pt-[16px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Select size
          </Text>
          <View className="flex flex-row justify-center">
            <SizesBox size={size} width={`100px`} height={`40px`} />
          </View>
          <View className="mt-6 px-4 flex flex-row justify-between items-center border h-12 border-[#e0e0e0] border-opacity-25">
            <Text
              className="text-[#222] text-[16px] font-normal"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              size info
            </Text>
            <Pressable>
              <Icon name="angle-right" color="#9B9B9B" size={24} />
            </Pressable>
          </View>
          <Pressable
            className="px-8"
            onPress={() => {
              handleAddToCart(productId);
              setModalVisible(false);
            }}>
            <View
              className="bg-[#DB3022] mt-[28px] h-12 w-[343px] flex flex-row items-center justify-center rounded-[25px]"
              style={{
                elevation: 2,
                shadowColor: 'rgb(211, 38, 38)',
                shadowOffset: {width: 4, height: 8},
                shadowOpacity: 0.25,
                shadowRadius: 0,
              }}>
              <Text className="text-white text-center">Add To Cart</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: -20,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    right: -10,
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    width: width,
    height: 352,
    backgroundColor: '#F9F9F9',
    // paddingLeft: 16,
  },
});

export default SizeModal;
