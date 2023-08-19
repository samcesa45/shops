import React from "react";
import Container from "../../../components/Container";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "CategoryImage">;
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const CategoryImageScreen = ({ navigation }: Props) => {
  return (
    <Container isScrollable style={{ flex: 1 }}>
      <View>
        <Image
          source={require("../../../assets/new_collection_img.png")}
          style={[styles.image, { position: "relative" }]}
          resizeMode="cover"
        />

        <Text
          className="text-[#fff]  text-[34px] font-[900] capitalize leading-normal absolute top-[80%] right-10"
          style={{ fontFamily: "CircularStd" }}
        >
          New Collection
        </Text>
      </View>
      <View className="mx-[100px]">
        <View className="flex flex-row justify-center">
          <View className="mt-[59px]">
            <Pressable onPress={() => navigation.navigate("Shop")}>
              <Text
                className="text-[#DB3022]  text-[34px] font-[900] capitalize leading-normal ml-[15px] mr-[39px]"
                style={{ fontFamily: "CircularStd" }}
              >
                Summer Sale
              </Text>
            </Pressable>
            <View className="relative">
              <Image
                source={require("../../../assets/black_img.png")}
                style={{ marginTop: 40, width: width / 2, height: 304 }}
                resizeMode="cover"
              />
              <Text
                className="text-white  text-[34px] font-[900] capitalize leading-normal absolute top-[70%] left-[13px]"
                style={{ fontFamily: "CircularStd" }}
              >
                Black
              </Text>
            </View>
          </View>
          <View className="relative">
            <Image
              source={require("../../../assets/mens_hoodie_img.png")}
              style={{ width: width / 2, flexGrow: 1, height: height / 2 }}
              resizeMode="cover"
            />
            <Text
              className="text-white  text-[34px] font-[900]  leading-normal absolute top-[204px] left-[37px]"
              style={{ fontFamily: "CircularStd", fontStyle: "normal" }}
            >
              Men's hoodies
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CategoryImageScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "center",
    width: width,
    height: 366,
  },
});
