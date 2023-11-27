import React from 'react';
// import { API_URL } from "@env";
import {useForm, Controller} from 'react-hook-form';
// import { TextInput } from "react-native";
import {View, Text, Pressable, Image, SafeAreaView} from 'react-native';
import {TextInput} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {useAppDispatch} from '../../state-management/hooks';
import {login} from '../../state-management/features/usersSlice';
import {setAuthToken} from '../../utils/SetAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from '../../components/Spinner';
import Container from '../../components/Container/index';
import {RootStackParamList} from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormData = {
  email: string;
  password: string;
};
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6, 'Must be 6 characters or less').required(),
});
const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  let login_status = false;
  let error_message = '';

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting, isValid},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async data => {
    login_status = true;
    await axios
      .post(`https://ab1f-160-119-127-230.ngrok-free.app/v1/sanctum/token`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    try {
      const loginResponse = await dispatch(login(data)).unwrap();
      console.log(loginResponse);
      if (
        // eslint-disable-next-line no-prototype-builtins
        loginResponse.hasOwnProperty('success') &&
        loginResponse.success === true
      ) {
        setAuthToken(loginResponse.data.token);
        AsyncStorage.setItem('token', loginResponse.data.token);
        AsyncStorage.getItem('token');
        AsyncStorage.setItem('login_status', 'true');
        if (
          loginResponse.data.profile.is_platform_admin === 0 &&
          loginResponse.data.role.includes('customer')
        ) {
          navigation.push('Vendors');
        } else if (loginResponse.data.profile.is_platform_admin) {
          navigation.push('Dashboard');
        } else {
          console.log(loginResponse.message.email[0]);
          login_status = false;
          error_message = loginResponse.message.email[0];
          setAuthToken('');
          AsyncStorage.clear();
        }
      }
    } catch (err) {
      login_status = false;
      console.log(err);
      setAuthToken('');
      AsyncStorage.clear();
    }
  });

  if (isSubmitting) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1">
      <Container isScrollable style={{flex: 1}}>
        <View className="w-full px-4 py-[53px] h-[812px] relative bg-stone-50">
          <View className="pt-[64px] ">
            <Text className="font-bold text-neutral-800 text-[34px]">
              Login
            </Text>
          </View>
          <View className="h-16 w-full flex-shrink-0 relative mt-[64px]  text-black  rounded shadow">
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="mt-2">
                  <TextInput
                    className=" text-zinc-800 bg-red-500 h-16 w-full text-[20px]  shadow   text-sm font-medium placeholder:px-4  leading-tight"
                    label="Email"
                    variant="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    color={`${errors.email ? '#DB3022' : '#2AA952'}`}
                    trailing={props =>
                      !errors.email && (
                        <Icon color="#2AA952" name="check" size={24} />
                      )
                    }
                  />
                </View>
              )}
              name="email"
            />
            <Text className="text-red-600 text-xs ml-9">
              {errors.email?.message}
            </Text>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="mt-2">
                  <TextInput
                    secureTextEntry={true}
                    className=" text-zinc-800 bg-red-500 h-16 w-full text-[20px]  shadow   text-sm font-medium placeholder:px-4  leading-tight"
                    label="Password"
                    variant="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    cursorColor="black"
                    color={`${errors.password ? '#DB3022' : '#2AA952'}`}
                    trailing={() =>
                      !errors.password && (
                        <Icon color="#2AA952" name="check" size={24} />
                      )
                    }
                  />
                </View>
              )}
              name="password"
            />
            <Text className="text-red-600 text-xs ml-9">
              {errors.password?.message}
            </Text>
            <Pressable
              className="mt-4"
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-right text-[#222] text-sm font-medium">
                Forgot your password?{' '}
                <Icon name="arrow-right" color="#DB3022" size={24} />
              </Text>
            </Pressable>
            <View className="mt-7 rounded-[25px]">
              {/* <Button title="SignUp" color="#DB3022" /> */}
              <Pressable
                disabled={!isValid && !isSubmitting}
                className={`${
                  isValid && !isSubmitting
                    ? 'rounded-[25px] bg-red-600 shadow h-12 '
                    : ' h-12 focus:outline-none  rounded-[25px]  text-center  bg-gray-200 cursor-not-allowed'
                }`}
                style={({pressed}) => [
                  pressed && {
                    opacity: 0.8,
                    shadowColor: 'rgba(211, 38, 38, 0.25)',
                    elevation: 2,
                  },
                ]}
                onPress={onSubmit}>
                <Text
                  className={` ${
                    isValid && !isSubmitting
                      ? 'text-white text-sm font-medium leading-tight uppercase my-3.5 text-center'
                      : 'text-sm font-medium leading-tight uppercase my-3.5 text-center'
                  } `}>
                  Login
                </Text>
              </Pressable>
            </View>
            <View className="mt-[194px]">
              <Text className="text-[#222] text-sm h-5 text-center font-medium leading-tight">
                Or login with social account
              </Text>
            </View>
            <View className="flex flex-row mt-8 justify-center">
              <Image source={require('../../assets/google.png')} />
              <Image source={require('../../assets/facebook.png')} />
            </View>
            <View className="mt-[23px] flex flex-row justify-center"></View>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default LoginScreen;
