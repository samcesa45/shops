import React, {useState, useEffect} from 'react';

import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import Container from '../Container';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch, useAppSelector} from '../../state-management/hooks';
import {
  getAllBrands,
  selectAllBrands,
} from '../../state-management/features/brandSlice';
import CheckBox from '@react-native-community/checkbox';
import {Spinner} from '../Spinner';
import {brandType} from '../../type/model';
import {setBrandFilter} from '../../state-management/features/filterSlice';

type Props = {
  showSearchModal: boolean;
  brand: string[];
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const BrandModal = ({
  showSearchModal,
  setShowSearchModal,
  // setFilterModalVisible,
  brand,
}: Props) => {
  // const brands = useAppSelector(selectAllBrands);
  const dispatch = useAppDispatch();
  const brands = useAppSelector(selectAllBrands);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [checkedItems, setCheckedItems] = useState(
  //   Array(brands.length).fill(false)
  // );

  // const handleCheckBoxChange = (index: number) => {
  //   setSelectedBrands(prevCheckedItems =>
  //     prevCheckedItems.map((checked, i) => (i === index ? !checked : checked))
  //   );
  // };
  const handleCheckBoxChange = (index: number) => {
    dispatch(setBrandFilter(index));
  };

  console.log('brand', brand);
  let filteredBrands: brandType[] = [];
  filteredBrands = brands.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const isBrandSelected = (item: string) => brand?.includes(item);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllBrands())
      .unwrap()
      .then(promiseResult => {
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e.message);
      });
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      propagateSwipe={true}
      isVisible={showSearchModal}
      style={styles.modal}>
      <Container isScrollable={true} style={{flex: 1}}>
        <View className="w-[343px] mx-4  mt-[44px]">
          <Text
            className="text-center font-medium text-[18px] leading-[22px] text-[#222]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Brand
          </Text>
          <TextInput
            value={search}
            placeholder="Search"
            onChangeText={text => setSearch(text)}
            className="border relative border-white rounded-[25px] bg-white h-[40px] text-[#222] px-[41px] mt-[21px]
            placeholder:text-[#9B9B9B] placeholder:text-[16px] placeholder:leading-normal placeholder:font-medium placeholder:italic"
            style={{elevation: 5}}
          />
          <Icon name="search" size={14} color="#8E8E93" style={styles.icon} />
        </View>
        <View>
          {!isLoading ? (
            filteredBrands.map((item, index) => (
              <View
                className="flex flex-row justify-between w-[343px] m-3 text-[#222]"
                key={item.id}>
                <Text
                  className={`italic font-medium leading-normal text-[16px] ${
                    isBrandSelected(item.id) ? 'text-[#DB3022]' : 'text-[#222]'
                  }`}
                  style={{
                    fontFamily: 'CircularStd',
                  }}>
                  {item.name}
                </Text>
                <CheckBox
                  disabled={false}
                  id={item.id}
                  value={isBrandSelected(item.id)}
                  onValueChange={() => handleCheckBoxChange(index)}
                  tintColors={isBrandSelected(item.id) ? '#DB3022' : '#222'}
                  onTintColor={'#DB3022'}
                  onCheckColor={'#DB3022'}
                  boxType="circle"
                  tintColor={isBrandSelected(item.id) ? '#DB3022' : '#222'}
                />
              </View>
            ))
          ) : (
            <Spinner />
          )}
        </View>
        <View className=" mt-[41px]">
          <View className="flex flex-row justify-evenly">
            <Pressable onPress={() => setShowSearchModal(false)}>
              <View className="w-[160px] h-9 border border-[#222222] rounded-[24px] flex flex-row items-center justify-center ">
                <Text
                  className="text-sm font-medium text-[#222]"
                  style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                  Discard
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowSearchModal(false);
              }}>
              <View
                className="w-[160px] h-9 border border-[#DB3022] bg-[#DB3022] rounded-[24px] flex flex-row items-center justify-center "
                style={{
                  shadowColor: 'rgb(211,38,38)',
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  shadowOffset: {width: 0, height: 4},
                  elevation: 2,
                }}>
                <Text
                  className="text-sm font-medium text-white"
                  style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                  Apply
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: -20,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    right: -10,
    height: height,
    width: width,
    backgroundColor: '#F9F9F9',
    paddingLeft: 16,
    marginLeft: -40,
  },
  icon: {
    position: 'absolute',
    top: 60,
    bottom: 13,
    left: 15,
  },
});

export default BrandModal;
