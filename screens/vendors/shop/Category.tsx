import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import Container from '../../../components/Container';
import {Spinner} from '../../../components/Spinner';
import {
  getAllCategories,
  selectAllCategories,
} from '../../../state-management/features/categoriesSlice';
import {
  getAllProducts,
  selectAllProducts,
} from '../../../state-management/features/productsSlice';
import {useAppDispatch, useAppSelector} from '../../../state-management/hooks';
import {categoryType, productType} from '../../../type/model';

type ItemProps = {
  item: categoryType;
  onPress: () => void;
  textColor: string;
  style: object;
};

const ProductItem = ({name, image_url}: productType) => {
  return (
    <View>
      <View
        className="flex-row items-center  justify-between h-[100px] my-4 bg-white w-[343px] rounded-[8px]"
        style={{elevation: 2}}>
        <Text
          className="text-[#222] capitalize ml-[23px] text-[18px] leading-[22px] font-normal"
          style={{
            fontFamily: 'CircularStd',
            fontStyle: 'italic',
          }}>
          {name}
        </Text>
        <Image
          source={{uri: image_url}}
          style={{
            width: 171,
            height: 100,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            flexShrink: 0,
          }}
        />
      </View>
    </View>
  );
};
const Item = ({item, onPress, textColor, style}: ItemProps) => (
  <Pressable onPress={onPress} style={[{}]}>
    <View style={[style]}>
      <Text
        style={[{color: textColor, fontFamily: 'CircularStd'}]}
        className="text-sm italic font-normal capitalize leading-normal text-center pl-[35px] pr-[82px] text-[#222]">
        {item.name}
      </Text>
    </View>
  </Pressable>
);

const Category = () => {
  const categories = useAppSelector(selectAllCategories);
  const products = useAppSelector(selectAllProducts);
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = React.useState('');
  const [selectedId, setSelectedId] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedId(categoryId);
  };

  React.useEffect(() => {
    setLoading(true);
    dispatch(getAllCategories())
      .unwrap()
      .then(result => {
        setLoading(false);
        setErrorMessage('');
      })
      .catch(errorResponse => {
        setErrorMessage(errorResponse.message);
      });
  }, [dispatch]);

  React.useEffect(() => {
    setLoading(true);
    // setRefreshing(true);
    dispatch(getAllProducts())
      .unwrap()
      .then(result => {
        setLoading(false);
        setRefreshing(false);
        setErrorMessage('');
      })
      .catch(errorResponse => {
        setErrorMessage(errorResponse.message);
      });
  }, [dispatch]);

  const renderItem = ({item}: {item: categoryType}) => {
    const borderBottomWidth = item.id === selectedId ? 2 : 0;
    const borderBottomColor = item.id === selectedId ? '#DB3022' : '';

    return (
      <Item
        style={{
          borderBottomWidth,
          borderBottomColor,
          height: 34,
        }}
        item={item}
        onPress={() => toggleCategory(item.id)}
        textColor={'#222'}
      />
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const uniqueCat = [...new Set(categories)];
  const filteredCat = uniqueCat.filter(category => category.parent_id === null);
  return (
    <Container isScrollable={false} style={{flex: 1}}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <View className="">
        <View>
          <FlatList
            data={filteredCat}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            extraData={selectedId}
            style={{backgroundColor: '#ffffff', height: 44}}
            contentContainerStyle={{padding: 10, flexGrow: 0}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['red', 'blue']}
              />
            }
          />
        </View>
        <View className="flex flex-row justify-center mt-4">
          <View
            className="w-[343px] h-[100px] bg-[#DB3022] items-center rounded-[8px] justify-center"
            style={{
              shadowOffset: {
                width: 1,
                height: 25,
              },
              shadowColor: '#222',
              shadowOpacity: 1,
              elevation: 1,
              shadowRadius: 25,
            }}>
            <Text className="text-white">Summer Sales</Text>
            <Text className="text-white">Up to 50% off</Text>
          </View>
        </View>
        <View className="items-center pt-[8px] pb-[200px]">
          {loading ? (
            <View className="mt-[100px]">
              <Text>
                <Spinner />
              </Text>
            </View>
          ) : (
            <FlatList
              data={products.filter(
                product => product.category_id === selectedId
              )}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              extraData={selectedId}
              renderItem={({item}) => <ProductItem {...item} />}
            />
          )}
        </View>
      </View>
    </Container>
  );
};

export default Category;
