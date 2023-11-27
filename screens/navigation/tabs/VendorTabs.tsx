import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Bag from '../../vendors/bag';
import Favourite from '../../vendors/favorite';
import Profile from '../../vendors/profile';
import Vendors from '../../vendors/home';
import CheckSale from '../../vendors/home/CheckSale';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryImageScreen from '../../vendors/home/CategoryImageScreen';
import Category from '../../vendors/shop/Category';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import CustomDrawerContent from '../../../components/customDrawerContent';
import CategoryDetails from '../../vendors/shop/CategoryDetails';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const VendorTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Shop') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Bag') {
            iconName = focused ? 'shopping-bag' : 'shopping-bag';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'favorite-border' : 'favorite-border';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-outline' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#DB3022',
        tabBarInactiveTintColor: '#9B9B9B',
      })}>
      <Tab.Screen
        name="Home"
        component={VendorsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Bag" component={Bag} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default VendorTabs;

const Stack = createNativeStackNavigator();
const VendorsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Vendors"
        component={Vendors}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckSale"
        component={CheckSale}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryImage"
        component={CategoryImageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ShopScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{headerShown: false, headerTransparent: true}}
      />
      <Stack.Screen
        name="CategoryDetails"
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
        component={CategoryDetails}
      />
    </Stack.Navigator>
  );
};

const Custom = () => {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={({pressed}) => [
          {
            color: pressed ? '#9B9B9B' : 'transparent',
            opacity: pressed ? 0.2 : 1,
          },
        ]}>
        <Icon
          name={Platform.OS === 'android' ? 'search' : 'ios-menu'}
          size={20}
          style={{marginRight: 20}}
          color={'#222'}
        />
      </Pressable>
    </>
  );
};
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerLeft: false,
        headerRight: (props: any) => <Custom {...props} />,
      }}>
      <Drawer.Screen
        name="Category"
        component={Category}
        options={({navigation}) => ({
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: 'center',
          headerTitle: 'Categories',
          headerTitleStyle: {
            fontFamily: 'CircularStd',
            fontStyle: 'italic',
            fontWeight: 500,
          },
        })}
      />
    </Drawer.Navigator>
  );
}
