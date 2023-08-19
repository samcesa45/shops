/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSwap from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../../components/Container';
import Grid from '../../../components/grid';
import FilterModal from '../../../components/modal/FilterModal';
import SortModal from '../../../components/modal/SortModal';
import {Spinner} from '../../../components/Spinner';
import {
  getAllBrands,
  selectAllBrands,
} from '../../../state-management/features/brandSlice';
import {
  getCategoryById,
  selectCategoryRecord,
  selectAllCategories,
} from '../../../state-management/features/categoriesSlice';
import {filters} from '../../../state-management/features/filterSlice';

import {
  getAllProducts,
  selectAllProducts,
} from '../../../state-management/features/productsSlice';
import {useAppDispatch, useAppSelector} from '../../../state-management/hooks';
import {productType} from '../../../type/model';
import getFilteredProducts from '../../../utils/getFilteredProducts';
import {sortProductCategory} from '../../../utils/sortProductCategory';

type ItemProps = {
  title: string;
};

const CategoryDetails = ({route}: any) => {
  const [errMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFilterVisible, setFilterModalVisible] = useState(false);
  const categories = useAppSelector(selectAllCategories);
  const categoryRecord = useAppSelector(selectCategoryRecord);
  const {categoryId} = route.params;
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const brands = useAppSelector(selectAllBrands);
  // const getParentCat = categories.find(cat => cat.parent_id === null);
  const getChildCat = categories.filter(cat => cat.parent_id === categoryId);
  const [filteringProducts, setFilteringProducts] = useState<productType[]>([]);
  const [activeFilter, setActiveFilter] = useState(true);
  // const [selectedBrands, setSelectedBrands] = useState(
  //   Array(brands.length).fill(false)
  // );

  const filter = useAppSelector(filters);
  const {price, category, color, brand, size} = filter;

  const [sortOption, setSortOption] = React.useState<
    'low to high' | 'high to low' | 'newest' | 'popular' | 'customer_review'
  >('low to high');

  const handleGridToggle = () => {
    setToggle(!toggle);
    setNumColumns(numColumns === 1 ? 2 : 1);
  };

  const toggleFilter = () => {
    setActiveFilter((prevActiveFilter: boolean) => !prevActiveFilter);
  };
  const handleSortingOption = (
    option:
      | 'low to high'
      | 'high to low'
      | 'newest'
      | 'popular'
      | 'customer_review'
  ) => {
    setSortOption(option);
  };

  //filter products by category
  const productCategory = products.filter(
    product => product.category_id === categoryId
  );

  const sortedProductCategory = sortProductCategory(
    productCategory,
    sortOption
  );

  const filterCriteria = {
    price,
    color,
    size,
    category,
    brand,
  };

  const applyFilters = () => {
    const filteredProducts = getFilteredProducts(
      products,
      filterCriteria,
      categories,
      brands
    );
    console.log('applied');
    console.log('filter', filterCriteria);

    setFilteringProducts(filteredProducts);
  };

  // console.log(applyFilters());
  React.useEffect(() => {
    setIsLoading(true);
    dispatch(getAllProducts())
      .unwrap()
      .then(promiseResult => {
        setIsLoading(false);
        setFilteringProducts(promiseResult);
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.message);
        Alert.alert(err.message);
      });
  }, [dispatch, setFilteringProducts]);
  React.useEffect(() => {
    setIsLoading(true);
    dispatch(getAllBrands())
      .unwrap()
      .then(_promiseResult => {
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.message);
        Alert.alert(err.message);
      });
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCategoryById(categoryId))
      .unwrap()
      .then(promiseResult => {
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.message);
        Alert.alert(err.message);
      });
  }, [categoryId, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const capitalizeFirstLetter = (word: string) => {
    return `${word.charAt(0).toUpperCase() + word.slice(1)}`;
  };

  return (
    <Container isScrollable={false} style={{flex: 1}}>
      <View
        className="px-4 bg-white shadow-2xl fixed pb-[10px]"
        style={{
          shadowColor: 'rgb(0, 0, 0)',
          shadowOffset: {width: 0, height: 4},
          shadowRadius: 12,
          shadowOpacity: 0.12,
          elevation: 5,
        }}>
        <View className="pt-[106px]">
          <Text
            className="text-[34px] leading-normal font-bold text-[#222]"
            style={{fontFamily: 'CircularStd', fontStyle: 'normal'}}>
            {capitalizeFirstLetter(categoryRecord.name)}
          </Text>
        </View>
        <View className="mt-[11px] text-[#222]">
          <Pressable>
            <FlatList
              data={getChildCat}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Item title={item.name} />}
            />
          </Pressable>
        </View>
        <View className="mt-[18px] ml-3.5">
          <View className="bg-[#F9F9F9] flex flex-row justify-start items-center py-1">
            <View className="flex flex-row items-center">
              <Pressable
                onPress={() => {
                  toggleFilter();
                  setFilterModalVisible(true);
                }}>
                <Icon name="filter" color={'#222'} size={24} />
              </Pressable>
              <Text
                className="ml-[7px] text-[11px] leading-normal font-[450] text-[#222]"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                Filters
              </Text>
            </View>
            <View className="flex flex-row ml-[62px] items-center">
              <Pressable
                onPress={() => {
                  toggleFilter();
                  setModalVisible(true);
                }}>
                <IconSwap name="swap-vertical" color={'#222'} size={24} />
              </Pressable>
              <Text
                className="ml-[7px] text-[11px] leading-normal font-[450] text-[#222]"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                Sort by: {sortOption}
              </Text>
            </View>
            <View className="flex flex-row ml-[62px] items-center">
              <Pressable onPress={handleGridToggle}>
                {toggle ? (
                  <IconSwap name="view-module" color={'#222'} size={24} />
                ) : (
                  <IconSwap name="view-list" color={'#222'} size={24} />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <Grid
        numColumns={numColumns}
        toggle={toggle}
        sortedProductCategory={sortedProductCategory}
        filteringProducts={filteringProducts}
        activeFilter={activeFilter}
      />
      <SortModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleSortingOption={handleSortingOption}
      />
      <FilterModal
        setFilterModalVisible={setFilterModalVisible}
        modalFilterVisible={modalFilterVisible}
        brand={brand}
        price={price}
        color={color}
        size={size}
        category={category}
        applyFilters={applyFilters}
      />
    </Container>
  );
};

export default CategoryDetails;

const Item = ({title}: ItemProps) => (
  <View
    className="w-[100px] mx-1  rounded-[25px] h-[30px] flex flex-row justify-center items-center"
    style={styles.itemContainer}>
    <Text className="text-white font-medium text-sm" style={styles.itemText}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(34,34,34,1)',
  },
  itemText: {
    fontFamily: 'CircularStd',
    fontStyle: 'italic',
  },
});