import React from 'react';
import {Text, View, Dimensions, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {ColorPicker} from 'react-native-btr';
import SizesBox from '../sizeBox/SizeBox';
import CategoryBox from '../categoryBox/CategoryBox';
import Container from '../Container';
import Icons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../state-management/hooks';
import {selectAllBrands} from '../../state-management/features/brandSlice';
// import BrandModal from './BrandModal';

import {setColorFilter} from '../../state-management/features/filterSlice';
import Sliders from '../multiSlider';
import BrandModal from './BrandModal';

type Props = {
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalFilterVisible: boolean;
  brand: string[];
  price: number[];
  color: string;
  size: string[];
  category: string[];
  applyFilters: () => void;
};
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
function FilterModal({
  modalFilterVisible,
  setFilterModalVisible,
  brand,
  price,
  color,
  size,
  category,
  applyFilters,
}: Props) {
  const brands = useAppSelector(selectAllBrands);
  const dispatch = useAppDispatch();
  const [showSearchModal, setShowSearchModal] = React.useState(false);

  const handleColorChange = (color: string) => dispatch(setColorFilter(color));

  return (
    <Modal
      propagateSwipe={true}
      isVisible={modalFilterVisible}
      onBackdropPress={() => setFilterModalVisible(false)}
      style={styles.modal}>
      <Container isScrollable={true} style={{flex: 1}}>
        <Text
          className="text-center pt-[36px] text-[#222] text-[18px] font-bold leading-[120%]"
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          Filters
        </Text>
        <View>
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Price range
          </Text>
          <View
            className=" flex flex-row justify-center w-full bg-white mt-4 text-[#222] relative"
            style={{elevation: 2}}>
            <Sliders price={price} />
          </View>
        </View>
        <View>
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Colors
          </Text>
          <View
            className="bg-white h-[100px] relative flex flex-row justify-center items-center mt-2"
            style={{elevation: 2}}>
            <View
              className="relative flex flex-row justify-center"
              style={{width: width * 0.95}}>
              <ColorPicker
                onSelect={handleColorChange}
                selectedColor={color}
                colors={['black', 'red', 'grey', 'orange', 'green']}
              />
            </View>
          </View>
        </View>
        <View>
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Sizes
          </Text>
          <View
            className="bg-white  mt-2 py-2 flex flex-row flex-wrap"
            style={{elevation: 2}}>
            <SizesBox size={size} width={'60px'} height={`40px`} />
          </View>
        </View>
        <View className="">
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Category
          </Text>

          <View className="bg-white mt-2" style={{elevation: 2}}>
            <CategoryBox category={category} />
          </View>
        </View>
        <View className="pt-[32px]">
          <View className="flex flex-row justify-between items-center w-[334px]">
            <Text
              className=" pl-[16px]  text-[#222] text-[18px] font-bold leading-[120%]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Brand
            </Text>
            <Pressable onPress={() => setShowSearchModal(true)}>
              <Icons name="chevron-forward" size={24} color="#222" />
            </Pressable>
          </View>
          <View className="flex flex-row flex-wrap pl-4">
            {brands.length > 0 ? (
              [...brands].slice(0, 3).map(brand => (
                <View key={brand.id} className="flex flex-row justify-between">
                  <View className="mx-1">
                    <Text
                      className="text-[#9B9B9B] text-[11px] leading-normal font-medium"
                      style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                      {brand.name}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-[#9B9B9B]">No brand available</Text>
            )}
          </View>
        </View>
        <View className="pb-[68px] mt-4">
          <View className="flex flex-row justify-evenly">
            <Pressable onPress={() => setFilterModalVisible(false)}>
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
                applyFilters();
                setFilterModalVisible(false);
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
      <BrandModal
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        brand={brand}
        setFilterModalVisible={setFilterModalVisible}
      />
    </Modal>
  );
}

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
  },
});

export default FilterModal;
