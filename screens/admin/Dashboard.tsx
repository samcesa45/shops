import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Button } from "react-native";
import { logout } from "../../state-management/features/usersSlice";
import { useAppDispatch } from "../../state-management/hooks";
import { setAuthToken } from "../../utils/SetAuthToken";
type Props = {};

const Dashboard = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const userLogout = async () => {
    await dispatch(logout());
    setAuthToken("");
    AsyncStorage.clear();
    navigation.navigate("Login");
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Dashboard</Text>
      <Button title="logout" onPress={userLogout} />
    </View>
  );
};

export default Dashboard;
