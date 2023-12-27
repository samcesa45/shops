import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import useLoading from '../../components/useLoading';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  selectIsAuthenticated,
  selectUserProfile,
  selectUserRole,
} from '../../state-management/features/usersSlice';
import {useAppSelector} from '../../state-management/hooks';
import AdminStack from './AdminStack';
import AuthStack from './AuthStack';
import VendorStack from './VendorStack';

const Navigation = () => {
  let isAuthenticatedAdmin = false;
  let isAuthenticatedVendors = false;
  const profile = useAppSelector(selectUserProfile);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRoles = useAppSelector(selectUserRole);

  if (
    profile &&
    !profile.is_platform_admin &&
    isAuthenticated === true &&
    userRoles &&
    userRoles.includes('customer')
  ) {
    isAuthenticatedVendors = true;
  } else if (profile && profile.is_platform_admin && isAuthenticated === true) {
    isAuthenticatedAdmin = true;
  }

  axios.defaults.baseURL = `https://7f7f-105-113-61-139.ngrok-free.app/api`;
  axios.defaults.withCredentials = true;
  const isLoading = useLoading();
  const login_status = false;

  if (login_status) {
    return (
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
      />
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticatedAdmin ? (
        <AdminStack />
      ) : isAuthenticatedVendors ? (
        <VendorStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
