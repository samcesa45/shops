// import { TextInput } from "@react-native-material/core";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SearchModal from "../modal/SortModal";

type Props = {};

const SearchBarScreen = ({
  navigation,
  searchQuery,
  setSearchQuery,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <View>
      <View className="flex flex-row relative mt-[44px]">
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Icon
            name="search"
            size={24}
            color="#222222"
            style={{
              position: "absolute",
              right: 33,
              top: 8,
            }}
          />
        </Pressable>
      </View>
      <SearchModal />
    </View>
  );
};

export default SearchBarScreen;

const styles = StyleSheet.create({
  textInput: {
    fontStyle: "italic",
    fontFamily: "CircularStd",
  },
});
