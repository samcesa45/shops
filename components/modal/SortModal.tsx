import { Pressable } from "@react-native-material/core";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Modal from "react-native-modal";

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSortingOption: (
    option:
      | "low to high"
      | "high to low"
      | "newest"
      | "popular"
      | "customer_review"
  ) => void;
  modalVisible: boolean;
};
const { width } = Dimensions.get("window");
function SortModal({
  modalVisible,
  setModalVisible,
  handleSortingOption,
}: Props) {
  const [selected, setSelected] = useState(0);
  const handleSelected = (value: number) => setSelected(value);

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={modalVisible}>
        <View style={styles.modal}>
          <Text
            className="text-center pt-[36px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            Sort by
          </Text>
          <View className="">
            <Pressable
              onPress={() => {
                handleSelected(0);
                handleSortingOption("popular");
                setModalVisible(false);
              }}
            >
              <Text
                className={`text-[#222] px-[16px] text-[16px] font-medium leading-normal py-[16px] ${
                  selected === 0 ? "bg-[#DB3022]  text-white" : ""
                }`}
                style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
              >
                Popular
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleSelected(1);
                handleSortingOption("newest");
                setModalVisible(false);
              }}
            >
              <Text
                className={`text-[#222] text-[16px] px-4 font-medium leading-normal py-[16px]  ${
                  selected === 1 ? "bg-[#DB3022]  text-white" : ""
                }`}
                style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
              >
                Newest
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleSelected(2);
                handleSortingOption("customer_review");
                setModalVisible(false);
              }}
            >
              <Text
                className={`text-[#222] text-[16px] px-4 font-medium leading-normal py-[16px]  ${
                  selected === 2 ? "bg-[#DB3022]  text-white" : ""
                }`}
                style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
              >
                Customer Review
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleSelected(3);
                handleSortingOption("low to high");
                setModalVisible(false);
              }}
            >
              <Text
                className={`text-[#222] text-[16px] px-4 font-medium leading-normal py-4 ${
                  selected === 3 ? "bg-[#DB3022]  text-white" : ""
                }`}
                style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
              >
                Price: lowest to highest
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleSelected(4);
                handleSortingOption("high to low");
                setModalVisible(false);
              }}
            >
              <Text
                className={`text-[#222] text-[16px] px-4 font-medium leading-normal py-4 ${
                  selected === 4 ? "bg-[#DB3022]  text-white" : ""
                }`}
                style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
              >
                Price: highest to lowest
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: -20,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    right: -10,
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    width: width,
    height: 352,
    backgroundColor: "#F9F9F9",
    // paddingLeft: 16,
  },
});

export default SortModal;
