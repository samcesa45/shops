import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Dimensions,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {
  getAllUsers,
  logout,
  selectUserProfile,
} from '../../../state-management/features/usersSlice';
import {useAppDispatch, useAppSelector} from '../../../state-management/hooks';
import {RootStackParamList} from '../../../types';
import {setAuthToken} from '../../../utils/SetAuthToken';
import {
  capitalizeFirstLetter,
  uppercaseFirstLetter,
} from '../../../utils/capitalizeFirstLetter';
import AngleIcon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../../components/card/Card';
import Container from '../../../components/Container';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({navigation}: Props) => {
  const profile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const fullName = `${capitalizeFirstLetter(
    profile.first_name
  )} ${capitalizeFirstLetter(profile.last_name)}`;

  const {width} = useWindowDimensions();
  const userLogout = async () => {
    await dispatch(logout());
    setAuthToken('');
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  useEffect(() => {
    dispatch(getAllUsers())
      .unwrap()
      .then(promiseResult => {
        setErrorMessage('');
      })
      .catch(errorResponse => {
        setErrorMessage(errorResponse.message);
      });
  }, [dispatch]);
  return (
    <Container isScrollable style={{flex: 1}}>
      <View className=" pt-[62px] pb-[27px]">
        <Text
          className="text-[34px] font-700 px-[14px] text-[#222] leading-normal font-[700]"
          style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
          My profile
        </Text>
        <View className="mt-[24px] px-[14px] flex flex-row">
          <View className="mr-[18px]">
            <Image
              source={{
                uri:
                  profile?.profile_picture_path ||
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
              }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 100,
                flexShrink: 0,
              }}
            />
          </View>
          <View>
            <Text
              className="text-[#222] text-[18px] leading-[22px] font-[600]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              {fullName}
            </Text>
            <Text
              className="text-[#9B9B9B]  text-sm font-[500]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              {profile.email}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('Orders')}>
          <Card
            className={` bg-[rgba(155,155,155,0.05)] mt-[46px] py-[calc(72px-18px-15px)] w-full px-[14px] border border-gray-200  border-b-gray-200 flex flex-row justify-between items-center`}>
            <View>
              <Text
                className="text-[#222]  text-[20px] leading-normal font-[700]"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                My orders
              </Text>
              <Text
                className="text-[#9B9B9B] text-xs leading-normal font-[450]"
                style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
                Already have 12 orders
              </Text>
            </View>
            <View>
              <AngleIcon
                name="keyboard-arrow-right"
                size={24}
                color={`#9B9B9B`}
              />
            </View>
          </Card>
        </Pressable>
        <Card
          className={` bg-[rgba(155,155,155,0.05)] py-[calc(72px-18px-15px)] w-full px-[14px] border border-gray-200  border-b-gray-200  flex flex-row justify-between items-center`}>
          <View>
            <Text
              className="text-[#222]  text-[20px] leading-normal font-[700]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Shipping addresses
            </Text>
            <Text
              className="text-[#9B9B9B] text-xs leading-normal font-[450]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              3 ddresses
            </Text>
          </View>
          <View>
            <AngleIcon
              name="keyboard-arrow-right"
              size={24}
              color={`#9B9B9B`}
            />
          </View>
        </Card>
        <Card
          className={` bg-[rgba(155,155,155,0.05)] py-[calc(72px-18px-15px)] w-full px-[14px] border border-gray-200  border-b-gray-200  flex flex-row justify-between items-center`}>
          <View>
            <Text
              className="text-[#222]  text-[20px] leading-normal font-[700]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Payment methods
            </Text>
            <Text
              className="text-[#9B9B9B] text-xs leading-normal font-[450]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Visa **34
            </Text>
          </View>
          <View>
            <AngleIcon
              name="keyboard-arrow-right"
              size={24}
              color={`#9B9B9B`}
            />
          </View>
        </Card>
        <Card
          className={` bg-[rgba(155,155,155,0.05)] py-[calc(72px-18px-15px)] w-full px-[14px] border border-gray-200  border-b-gray-200  flex flex-row justify-between items-center`}>
          <View>
            <Text
              className="text-[#222]  text-[20px] leading-normal font-[700]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Promocodes
            </Text>
            <Text
              className="text-[#9B9B9B] text-xs leading-normal font-[450]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              You have special promocodes
            </Text>
          </View>
          <View>
            <AngleIcon
              name="keyboard-arrow-right"
              size={24}
              color={`#9B9B9B`}
            />
          </View>
        </Card>
        <Card
          className={` bg-[rgba(155,155,155,0.05)] py-[calc(72px-18px-15px)] w-full px-[14px] border border-gray-200  border-b-gray-200  flex flex-row justify-between items-center`}>
          <View>
            <Text
              className="text-[#222]  text-[20px] leading-normal font-[700]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              My reviews
            </Text>
            <Text
              className="text-[#9B9B9B] text-xs leading-normal font-[450]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Reviews for 4 items
            </Text>
          </View>
          <View>
            <AngleIcon
              name="keyboard-arrow-right"
              size={24}
              color={`#9B9B9B`}
            />
          </View>
        </Card>
        <Card
          className={` bg-[rgba(155,155,155,0.05)] py-[calc(72px-18px-15px)] w-full px-[14px] border border-gray-200  border-b-gray-200  flex flex-row justify-between items-center`}>
          <View>
            <Text
              className="text-[#222]  text-[20px] leading-normal font-[700]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Settings
            </Text>
            <Text
              className="text-[#9B9B9B] text-xs leading-normal font-[450]"
              style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
              Notifications, password
            </Text>
          </View>
          <View>
            <AngleIcon
              name="keyboard-arrow-right"
              size={24}
              color={`#9B9B9B`}
            />
          </View>
        </Card>
        {/* <Text>
        <Button
          onPress={userLogout}
          title="Logout"
          color="red"
          accessibilityLabel="Learn more about this purple button"
        />
      </Text> */}
      </View>
    </Container>
  );
};

export default Profile;
