import {NavigationProp, RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
  Profiles: undefined;
  Orders: undefined;
  Payment: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Register: {itemId: number};
  CreatePost: {post: string};
  Feed: {user: string} | undefined;
  Message: undefined;
  Root: undefined;
  Setting: undefined;
  Details: undefined;
  Vendors: undefined;
  CheckSale: undefined;
  CategoryImage: undefined;
  CategoryDetails: {
    categoryId: string;
  };
};

export type CategoryDetailsRouteProp = RouteProp<
  RootStackParamList,
  'CategoryDetails'
>;
export type CategoryDetailsNavigationProp = NavigationProp<
  RootStackParamList,
  'CategoryDetails'
>;
