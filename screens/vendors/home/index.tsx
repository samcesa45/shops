import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {logout} from '../../../state-management/features/usersSlice';
import {useAppDispatch, useAppSelector} from '../../../state-management/hooks';
import {setAuthToken} from '../../../utils/SetAuthToken';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Container from '../../../components/Container/index';
import {
  getAllNewProducts,
  selectAllNewProducts,
} from '../../../state-management/features/newestProductSlice';
import {productType} from '../../../type/model';
import {Spinner} from '../../../components/Spinner';
import {RootStackParamList} from '../../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Vendors'>;

type ItemProps = {
  item: productType;
  onPress: () => void;
};
const {width} = Dimensions.get('window');

const Item = ({item, onPress}: ItemProps) => (
  <Pressable onPress={onPress} className="pb-[100px]">
    <View className=" w-[156px] h-[260px] mx-2" style={{elevation: 2}}>
      <Image
        source={{uri: item.image_url}}
        alt={item.name}
        className=" relative w-[150px] h-[218px] "
        style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
      />

      <View
        className={`w-10 h-6 ${
          item.name === 'new' ? 'bg-[#222]' : 'bg-[#DB3022]'
        } rounded-[29px] left-2.5 top-2.5 absolute`}>
        <Text
          className="text-center text-white font-[450] leading-normal text-[11px]"
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          {item.name}
        </Text>
      </View>
      <View className="w-9 h-9 bg-white flex flex-row items-center  justify-center rounded-full shadow-lg absolute bottom-6 z-[1] -right-1">
        <Icon name="favorite-border" color="#9B9B9B" />
      </View>
      <View className="flex flex-row my-1">
        <Icon name="star-outline" color="#9B9B9B" size={20} />
        <Icon name="star-outline" color="#9B9B9B" size={20} />
        <Icon name="star-outline" color="#9B9B9B" size={20} />
        <Icon name="star-outline" color="#9B9B9B" size={20} />
        <Icon name="star-outline" color="#9B9B9B" size={20} />
        <Text className="text-[#9B9B9B]">({item.final_total_rating})</Text>
      </View>
      <View className="flex items-start">
        <Text
          className="text-[#9B9B9B] font-[400] leading-normal text-[11px]"
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          {/* {item.subTitle} */}
          Biggest sale
        </Text>
        <Text
          className="text-[#222] text-[16px] leading-normal mt-[5px]"
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          {item.name}
        </Text>
        <Text
          className="text-[#222] text-sm font-medium leading-normal"
          style={{fontFamily: 'CircularStd', fontStyle: 'normal'}}>
          $ {item.final_unit_price}
        </Text>
      </View>
    </View>
  </Pressable>
);

const Vendors = ({navigation}: Props) => {
  const newestProducts = useAppSelector(selectAllNewProducts);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const userLogout = async () => {
    await dispatch(logout());
    setAuthToken('');
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const renderItem = ({item}: {item: productType}) => {
    return <Item item={item} onPress={() => console.log('hi')} />;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    setloading(true);
    dispatch(getAllNewProducts())
      .unwrap()
      .then(result => {
        setloading(false);
        setErrorMessage('');
      })
      .catch(errorResponse => {
        Alert.alert(errorResponse.message);
        setErrorMessage(errorResponse.message);
      });
  }, [dispatch]);

  return (
    <Container isScrollable style={{flex: 1}}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <View className="relative">
        <Image
          source={require('../../../assets/vendor_bg.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View className="mx-3.5 absolute bottom-[20px]">
          <Text
            className="text-[#fff]  text-[48px] font-[900] capitalize leading-normal"
            style={{fontFamily: 'CircularStd'}}>
            Fashion Sale
          </Text>

          <Pressable
            android_ripple={{color: '#99443d'}}
            className="mt-3.5 rounded-[25px] bg-[#DB3022] shadow-lg w-[160px] h-9"
            onPress={() => navigation.navigate('CheckSale')}
            // onPress={userLogout}
          >
            <Text
              className="text-white my-1 text-center capitalize text-sm font-medium"
              style={{
                fontFamily: 'CircularStd',
                fontStyle: 'italic',
              }}>
              Check
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="mx-4">
        <View className="flex flex-row items-center justify-between  mt-[53px]">
          <View className="">
            <Text
              className="font-[700] text-[34px] text-[#222] leading-normal"
              style={{fontFamily: 'CircularStd'}}>
              New
            </Text>
            <Text
              className="text-[#9B9B9B] text-[14px] font-[450] leading-normal"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              You’ve never seen it before!
            </Text>
          </View>
          <Text
            className="text-[14px] text-[#222] font-[450] leading-normal"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            view all
          </Text>
        </View>
        <View className="mt-[19px]">
          {loading ? (
            <Spinner />
          ) : (
            <FlatList
              data={newestProducts}
              renderItem={renderItem}
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barStyle: {
    color: '#ffffff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: 536,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000',
  },
});

export default Vendors;
