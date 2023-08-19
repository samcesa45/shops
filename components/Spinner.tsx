import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Spinner = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="rgba(96, 165, 250, 1)" />
      </View>
    </>
  );
};
