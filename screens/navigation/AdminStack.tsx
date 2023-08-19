import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../admin/Dashboard";
// import Vendors from "../vendors/Vendors";

type Props = {};
const Stack = createNativeStackNavigator();
const AdminStack = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default AdminStack;
