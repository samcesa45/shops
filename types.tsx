export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
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
