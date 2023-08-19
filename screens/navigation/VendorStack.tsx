import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import CheckSale from "../vendors/home/CheckSale";
// import Vendors from "../vendors/home";
import VendorTabs from "./tabs/VendorTabs";
import ShopIndex from "../vendors/shop";

type Props = {};
const Stack = createNativeStackNavigator();
const VendorStack = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Vendor"
        component={VendorTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Shop" component={ShopIndex} />
    </Stack.Navigator>
  );
};

export default VendorStack;
