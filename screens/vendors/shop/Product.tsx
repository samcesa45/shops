/* eslint-disable @typescript-eslint/ban-types */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../../../components/Container';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ColorModal from '../../../components/modal/ColorModal';
import SizeModal from '../../../components/modal/SizeModal';
import {Spinner} from '../../../components/Spinner';
import {filters} from '../../../state-management/features/filterSlice';
import {
  getAllProducts,
  getProductById,
  selectProductRecord,
} from '../../../state-management/features/productsSlice';
import {useAppDispatch, useAppSelector} from '../../../state-management/hooks';
import StarRating from '../../../components/starRating';
import {selectAllBrands} from '../../../state-management/features/brandSlice';
import Button from '../../../components/button/Button';
import {Divider} from '@react-native-material/core';
import AngleIcon from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native';
import {selectAllNewProducts} from '../../../state-management/features/newestProductSlice';
import {cartItemType, productType} from '../../../type/model';
import {
  addToCart,
  selectAllCartItems,
} from '../../../state-management/features/cartItemSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ShowToast from '../../../components/toast';
import {Portal, Snackbar} from 'react-native-paper';

const {width} = Dimensions.get('screen');
const Product = ({route, navigation}: any) => {
  const {productId} = route.params;
  // console.log(item?.name);
  const dispatch = useAppDispatch();
  const productRecord = useAppSelector(selectProductRecord);
  const brands = useAppSelector(selectAllBrands);
  const products = useAppSelector(selectAllNewProducts);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalColorVisible, setModalColorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const onToggleSnackbar = () => setSnackbarVisible(!snackbarVisible);
  const onDismissSnackBar = () => setSnackbarVisible(false);
  const {size, color} = useAppSelector(filters);
  const cartItems = useAppSelector(selectAllCartItems);
  const getBrandName = (brand_id: string) => {
    const brand = brands.find(brand => brand.id === brand_id);
    return brand ? brand.name : 'unknown brand';
  };
  const cartItem = cartItems.find(item => item.product_id === productId);
  const cartIds = cartItem ? cartItem.id : '';
  const cartQty = cartItem ? cartItem.qty : 0;
  const cartPrice = cartItem ? cartItem.final_unit_price : 0.0;
  const cartDiscount = cartItem ? cartItem.unit_discount_pct : 0;
  const cartMeasure = cartItem ? cartItem.qty_uom : 'kg';
  const cartStatus = cartItem ? cartItem.status : 'added';
  const handleAddToCart = async (productId: string) => {
    try {
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
        id: cartIds,
        product_id: productId,
        qty: cartQty,
        qty_uom: cartMeasure,
        final_unit_price: parseFloat(cartPrice.toString()),
        status: cartStatus,
        unit_discount_pct: cartDiscount,
      };

      const response = await axios.post(
        `https://75e0-105-112-116-49.ngrok-free.app/api/v1/cart-items`,
        body,
        {headers}
      );
      console.log('added to cart', response.data);
      onToggleSnackbar();
    } catch (error) {
      console.log('error', error);
      setSnackbarVisible(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllProducts())
      .unwrap()
      .then(_promiseResult => {
        console.log(_promiseResult);
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.message);
        // Alert.alert(err.message);
      });
  }, [dispatch]);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductById(productId))
      .unwrap()
      .then(_promiseResult => {
        // console.log(promiseResult);
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.message);
        // Alert.alert(err.message);
      });
  }, [productId, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container isScrollable style={{flex: 1, position: 'relative'}}>
      {/* {errorMessage && <Text className="text-[#222]">An error occured!</Text>} */}
      <View className="" style={{width: 375, paddingBottom: 106}}>
        <View style={{width: 276, height: 413}}>
          <Image
            source={{uri: productRecord.image_url}}
            style={{width: width, height: 413}}
            alt={productRecord.name}
            className="w-[164px] h-[157px] relative"
          />
        </View>
        <View className="mt-3 flex flex-row px-4">
          <Pressable onPress={() => setModalVisible(true)}>
            <View className="border border-[#9B9B9B] mr-4 px-3 w-[138px] h-[40px] rounded-[8px] flex flex-row items-center justify-between">
              <Text
                className="text-[#222] text-sm font-medium"
                style={{fontFamily: 'CircularStd'}}>
                {size}
              </Text>
              <Icon color={'#222'} size={30} name="angle-down" />
            </View>
          </Pressable>

          <Pressable onPress={() => setModalColorVisible(true)}>
            <View className="border border-[#9B9B9B] px-3 w-[138px] h-[40px] rounded-[8px] flex flex-row items-center justify-between">
              <Text
                className="text-[#222] text-sm font-medium"
                style={{fontFamily: 'CircularStd'}}>
                {color}
              </Text>
              <Icon color={'#222'} size={30} name="angle-down" className="" />
            </View>
          </Pressable>
          <Pressable>
            <View
              className="w-9 h-9 bg-white flex flex-row items-center  justify-center rounded-full shadow-lg ml-4"
              style={{elevation: 5, shadowColor: '#222'}}>
              <Icons name="favorite-border" color="#9B9B9B" />
            </View>
          </Pressable>
        </View>
        <View className="mt-[22px] flex flex-row justify-between px-4">
          {/* <Dropdown label="Color" data={DATA} onSelect={setSelected} /> */}
          <View>
            <Text style={styles.text}>H&M</Text>
            <Text style={[styles.text, {fontSize: 11, color: '#9B9B9B'}]}>
              {getBrandName(productRecord.brand_id)}
            </Text>
            <View className="flex flex-row items-center mt-[5px]">
              <StarRating rating={productRecord.rating_score} />
              <Text
                className="text-[#9B9B9B] text-[10px]   font-[450] leading-normal"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                ({productRecord.final_total_rating})
              </Text>
            </View>
            <View className="mt-[26px]">
              <Text
                style={[
                  styles.text,
                  {fontSize: 14, lineHeight: 21, letterSpacing: -0.15},
                ]}>
                {productRecord.description}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Bag', {productId: productId})}>
            <Text className="text-[#222]">View Bag</Text>
          </Pressable>
        </View>
        <View
          className="mt-5 px-4  h-[112px] bg-white pt-5"
          style={{elevation: 0.5, width: width}}>
          <Button
            title="Add To Cart"
            style={styles.button}
            onPress={() => handleAddToCart(productId)}
          />

          <View className="w-[134px] h-[5px] bg-[#222] flex flex-row justify-center items-center mx-auto mt-[30px]"></View>
        </View>
        <View className="mt-[22px] ">
          <Divider style={styles.divider} />
          <View className="h-12 px-4 flex flex-row justify-between items-center">
            <Text style={[styles.text, {fontSize: 16}]}>Shipping Info</Text>
            <AngleIcon
              name="keyboard-arrow-right"
              size={16}
              color={`#9B9B9B`}
            />
          </View>
          <Divider style={styles.divider} />
          <View className="h-12 px-4 flex flex-row justify-between items-center">
            <Text style={[styles.text, {fontSize: 16}]}>Support</Text>
            <AngleIcon
              name="keyboard-arrow-right"
              size={16}
              color={`#9B9B9B`}
            />
          </View>
          <Divider style={styles.divider} />
          <View className="pt-[37px] px-4 flex flex-row justify-between items-center">
            <Text style={[styles.text, {fontSize: 18, lineHeight: 22}]}>
              You can also like this
            </Text>
            <Text style={[styles.text, {fontSize: 18, lineHeight: 22}]}>
              {products.length} items
            </Text>
          </View>
          <View className="mt-3">
            <FlatList
              data={products}
              renderItem={renderItem}
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingBottom: 40,
              }}
            />
          </View>
        </View>
      </View>
      {/* <View style={{width: 'auto'}}>
        <ShowToast
          visible={snackbarVisible}
          shadow={true}
          animation={false}
          hideOnPress={true}
          title="cart added"
          onHide={onDismissSnackBar}
        />
      </View> */}

      <SizeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        productId={productId}
      />
      <ColorModal
        modalVisible={modalColorVisible}
        setModalVisible={setModalColorVisible}
      />
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          style={{backgroundColor: '#222'}}>
          <Text className="text-white">Cart added</Text>
        </Snackbar>
      </Portal>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#222',
    fontFamily: 'CircularStd',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 28.8,
  },
  button: {
    backgroundColor: '#DB3022',
    width: 343,
    height: 48,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '500',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'CircularStd',
    shadowColor: 'rgb(211, 38, 38)',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  divider: {
    width: width,
  },
});

const renderItem = ({item}: {item: productType}) => {
  return (
    <View
      key={item.id}
      style={{
        width: 150,
        height: 260,
        display: 'flex',
        margin: 11,
      }}>
      <Image
        source={{uri: item.image_url}}
        className="rounded-[8px]"
        width={150}
        height={260}
      />
      <Text style={[styles.text, {fontSize: 11, fontStyle: 'italic'}]}>
        {/* {getBrandName(item.brand_id)} */}
      </Text>
      <Text style={styles.text}>{item.name}</Text>
      <Text
        style={[
          styles.text,
          {fontSize: 14, color: '#222', paddingVertical: 2},
        ]}>
        ${item.final_unit_price}
      </Text>
    </View>
  );
};
export default Product;
