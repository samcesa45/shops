import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../guest/ForgotPasswordScreen';
import LoginScreen from '../guest/LoginScreen';
import RegisterScreen from '../guest/RegisterScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerTitle: '', headerTransparent: true}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitle: '', headerTransparent: true}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerTransparent: true, headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
