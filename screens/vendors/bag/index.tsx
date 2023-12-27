import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../../components/Container';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Divider} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../state-management/hooks';

import {selectAllProducts} from '../../../state-management/features/productsSlice';
import {
  deleteCartItems,
  getAllCartItems,
  removeFromCart,
  update,
} from '../../../state-management/features/cartItemSlice';
import {Spinner} from '../../../components/Spinner';
import {
  decrementQty,
  incrementQty,
  selectAllCartItems,
} from '../../../state-management/features/cartItemSlice';
import Button from '../../../components/button/Button';
import PromoModal from '../../../components/modal/PromoModal';
import ArrowIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Bag = () => {
  // const {productId} = route.params;
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const cartItems = useAppSelector(selectAllCartItems);
  console.log(cartItems.length);

  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalPromoVisible, setPromoVisible] = React.useState(false);
  const [text, onChangeText] = React.useState('Enter your promo code');
  useEffect(() => {
    setLoading(true);
    dispatch(getAllCartItems())
      .unwrap()
      .then(result => {
        setLoading(false);
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.response.data);
        setLoading(false);
      });
  }, [dispatch]);

  const handleDeleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      dispatch(removeFromCart(productId));
      await dispatch(deleteCartItems(productId));
      setLoading(false);
    } catch (err: any) {
      setErrorMessage(err.response.data);
      setLoading(false);
    }
  };

  const handleIncrementCartItemQuantity = async (
    productId: string,
    newQty: number
  ) => {
    try {
      dispatch(incrementQty(productId));
      await dispatch(
        update({
          product_id: productId,
          qty: newQty,
          id: '',
          qty_uom: '',
          final_unit_price: 0,
          unit_discount_pct: 0,
          status: '',
          cart_id: '',
        })
      );
    } catch (error) {
      console.error('Erroor updating cart item qunatity', error);
    }
  };
  const handleDecrementCartItemQuantity = async (
    productId: string,
    newQty: number
  ) => {
    try {
      dispatch(decrementQty(productId));
      await dispatch(
        update({
          product_id: productId,
          qty: newQty,
          id: '',
          qty_uom: '',
          final_unit_price: 0,
          unit_discount_pct: 0,
          status: '',
          cart_id: '',
        })
      );
    } catch (error) {
      console.error('Erroor updating cart item qunatity', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return (
      <View className="flex flex-row justify-center items-center">
        <Text className="text-[#222]">{errorMessage}</Text>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View className="flex h-full justify-center items-center">
        <Text className="text-[#222] text-[32px]">No items in the cart</Text>
      </View>
    );
  }

  return (
    <Container
      isScrollable
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
      }}>
      <Text
        className="text-[#222] px-4 mt-[18px] font-bold text-[34px] leading-normal"
        style={{fontFamily: 'CircularStd'}}>
        My Bag
      </Text>
      <View
        className="flex items-center "
        style={{
          flex: 1,
          // width:375
        }}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item?.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator
          contentContainerStyle={{
            paddingBottom: 25,
            flexGrow: 1,
          }}
          renderItem={({item}) => {
            const product = products.find(p => p.id === item.product_id);
            if (product) {
              return (
                <View
                  className="w-[343px] h-[104px] flex flex-row flex-shrink-0 mt-6 rounded-[8px] bg-white"
                  style={{
                    shadowColor: 'rgb(0, 0, 0)',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.08,
                    shadowRadius: 25,
                    elevation: 2,
                  }}>
                  <View className="w-[107px] h-[104px]">
                    <Image
                      source={{
                        uri: product.image_url,
                      }}
                      className="w-[107px] h-[104px]"
                      style={{
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }}
                    />
                  </View>
                  <View className="w-[236px] h-[104px] px-3.5 py-[5.5px] flex flex-row justify-between">
                    <View>
                      <Text
                        className="text-[#222] text-[16px] font-[600] leading-normal"
                        style={{
                          fontFamily: 'CircularStd',
                          fontStyle: 'italic',
                        }}>
                        {product.name}
                      </Text>
                      <View className="flex flex-row justify-between">
                        <Text
                          className="text-[#9B9B9B] mr-4 text-[11px] font-medium leading-normal tracking-[-0.017px]"
                          style={{
                            fontFamily: 'CircularStd',
                            fontStyle: 'italic',
                          }}>
                          Color:
                          <Text className="text-[#222]"> {product.color}</Text>
                        </Text>
                        <Text
                          className="text-[#9B9B9B] mr-4 text-[11px] font-medium leading-normal tracking-[-0.017px]"
                          style={styles.text}>
                          Size:
                          <Text className="text-[#222]"> {product.size}</Text>
                        </Text>
                      </View>
                      <View className="flex flex-row items-center  mt-[17px]">
                        <Pressable
                          className="rounded-full bg-white w-9 h-9 flex flex-row items-center justify-center drop-shadow-md"
                          onPress={() =>
                            handleDecrementCartItemQuantity(item.id, item.qty)
                          }
                          style={styles.qty}>
                          <Icons
                            name="minus"
                            className="w-6 h-6"
                            color={'#9B9B9B'}
                            size={24}
                          />
                        </Pressable>
                        <View className="mx-4">
                          <Text
                            className="text-[#222] text-sm font-medium"
                            style={{
                              fontFamily: 'CircularStd',
                              fontStyle: 'normal',
                            }}>
                            {item.qty}
                          </Text>
                        </View>
                        <Pressable
                          className="rounded-full bg-white w-9 h-9 flex flex-row items-center justify-center drop-shadow-md"
                          onPress={() => {
                            handleIncrementCartItemQuantity(item.id, item.qty);
                          }}
                          style={styles.qty}>
                          <Icons
                            name="plus"
                            className="w-6 h-6"
                            color={'#9B9B9B'}
                            size={24}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View>
                      <Menu style={{width: 40}}>
                        <MenuTrigger>
                          <Icon
                            name="dots-vertical"
                            className="w-10 h-10"
                            size={40}
                            color={`#9B9B9B`}
                          />
                        </MenuTrigger>
                        <MenuOptions>
                          <MenuOption
                            style={styles.menuOption}
                            onSelect={() => console.log(`Add to favourite`)}>
                            <Text
                              className="text-[#222] text-[11px] font-medium text-center"
                              style={styles.text}>
                              Add To Favorite
                            </Text>
                          </MenuOption>
                          <Divider />
                          <MenuOption
                            style={styles.menuOption}
                            onSelect={() => handleDeleteProduct(item.id)}>
                            <Text
                              className="text-[#222] text-[11px] font-medium text-center"
                              style={styles.text}>
                              Delete from the list
                            </Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                      <Text
                        className="text-[#222] pt-[24px] text-sm text-right font-bold"
                        style={{
                          fontFamily: 'CircularStd',
                          fontStyle: 'normal',
                        }}>
                        ${item.final_unit_price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }
            return null;
          }}
        />
        <View
          className="mt-[25px] w-[343px] h-9 bg-white text-[#222] "
          style={styles.TextInputContainer}>
          <TextInput
            placeholder="Enter your promo code"
            value={text}
            onChangeText={onChangeText}
            cursorColor={'#9b9b9b'}
            editable
            className="text-[#222] h-12 pb-5 text-sm placeholder:text-[#9b9b9b] placeholder:font-bold font-medium   pl-5"
            style={{fontFamily: 'CircularStd'}}
          />
          <ArrowIcon
            onPress={() => setPromoVisible(true)}
            color={'white'}
            style={styles.arrowIcon}
            size={24}
            name="arrow-right"
          />
        </View>
        <View className="pt-[28px] flex flex-row justify-between">
          <View>
            <Text className="text-[#222] mr-[100px]">Total amount:</Text>
          </View>
          <View>
            <Text className="text-[#222]">
              {cartItems.reduce(
                (curr, acc) =>
                  parseFloat(curr) + parseFloat(acc.final_unit_price),
                0
              )}
            </Text>
          </View>
        </View>
        <View className="pt-[26px] pb-[105px]">
          <Button
            title="Checkout"
            style={styles.btnStyle}
            onPress={() => console.log('checkout')}
          />
        </View>
      </View>
      <PromoModal
        modalVisible={modalPromoVisible}
        setModalVisible={setPromoVisible}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: '#DB3022',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
    color: 'white',
    fontFamily: 'CircularStd',
    fontSize: 14,
    width: 343,
    textAlign: 'center',
    // fontWeight: 600.0,
    lineHeight: 20,
    textTransform: 'uppercase',
    elevation: 2,
    shadowColor: 'rgb(211, 38, 38)',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
  },
  arrowIcon: {
    backgroundColor: '#222',
    width: 36,
    height: 36,
    borderRadius: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  qty: {
    elevation: 2,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'CircularStd',
    fontStyle: 'italic',
  },
  TextInputContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    position: 'relative',
  },
});
export default Bag;
