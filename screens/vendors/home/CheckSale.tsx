import { Flex } from "@react-native-material/core";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { DATA, DATA2, ItemData } from "../../../utils/cardItems";
import Icon from "react-native-vector-icons/MaterialIcons";
import Navigation from "../../navigation/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../components/Container/index";

type Props = NativeStackScreenProps<RootStackParamList, "CheckSale">;
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
type ItemProps = {
  item: ItemData;
  onPress: () => void;
};
const Item2 = ({ item, onPress }: ItemProps) => (
  <Pressable onPress={onPress}>
    <View className=" w-[156px] h-[260px]">
      <Image
        source={item.img}
        alt={item.title}
        className="rounded-[8px] relative "
      />

      <View
        className={`w-10 h-6 ${
          item.tag === "New" ? "bg-[#222]" : "bg-[#DB3022]"
        } rounded-[29px] left-2.5 top-2.5 absolute`}
      >
        <Text
          className="text-center text-white font-[450] leading-normal text-[11px]"
          style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
        >
          {item.tag}
        </Text>
      </View>
      <View className="w-9 h-9 bg-white flex flex-row items-center  justify-center rounded-full shadow-lg absolute bottom-20 z-[1] right-2">
        <Icon name="favorite-border" color="#9B9B9B" />
      </View>
      <View className="flex flex-row my-1">
        <Icon name="star" color="#FFBA49" size={20} />
        <Icon name="star" color="#FFBA49" size={20} />
        <Icon name="star" color="#FFBA49" size={20} />
        <Icon name="star" color="#FFBA49" size={20} />
        <Icon name="star-half" color="#FFBA49" size={20} />
        <Text className="text-[#9B9B9B]">(0)</Text>
      </View>
      <View className="flex items-start flex-shrink-0">
        <Text
          className="text-[#9B9B9B] font-[400] leading-normal text-[11px]"
          style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
        >
          {item.subTitle}
        </Text>
        <Text
          className="text-[#222] text-[16px] leading-normal mt-[5px]"
          style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
        >
          {item.title}
        </Text>
        <Text
          className="text-[#222] text-sm font-medium"
          style={{ fontFamily: "CircularStd", fontStyle: "normal" }}
        >
          {item.amount}$
        </Text>
      </View>
    </View>
  </Pressable>
);

const CheckSale = ({ navigation }: Props) => {
  const renderSaleItem = ({ item }: { item: ItemData }) => {
    return <Item2 item={item} onPress={() => {}} />;
  };
  return (
    <Container isScrollable style={{ flex: 1 }}>
      <View className="relative">
        <Image
          source={require("../../../assets/check_sale_img.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View className="mx-[21px] pt-[158px] absolute bottom-[20px]">
          {/* <Button title="logout" onPress={userLogout} /> */}
          <Text
            className="text-[#fff]  text-[34px] font-[900] capitalize leading-normal"
            style={{ fontFamily: "CircularStd" }}
          >
            Street clothes
          </Text>
        </View>
      </View>

      <View className="mx-4 mt-[33px]">
        <View className="flex flex-row items-center justify-between">
          <View className="">
            <Text
              className="font-[700] text-[34px] text-[#222] leading-normal"
              style={{ fontFamily: "CircularStd" }}
            >
              Sale
            </Text>
            <Text
              className="text-[#9B9B9B] text-[14px] font-[450] leading-normal"
              style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
            >
              Super summer sale
            </Text>
          </View>
          <Pressable
            android_ripple={{ color: "#9B9B9B" }}
            onPress={() => navigation.navigate("CategoryImage")}
          >
            <Text
              className="text-[14px] text-[#222] font-[450] leading-normal"
              style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
            >
              view all
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="mt-[19px] mx-4">
        <FlatList
          data={DATA2}
          renderItem={renderSaleItem}
          bounces={false}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View className="mx-4 flex flex-row items-center justify-between  mt-[53px]">
        <View className="">
          <Text
            className="font-[700] text-[34px] text-[#222] leading-normal"
            style={{ fontFamily: "CircularStd" }}
          >
            New
          </Text>
          <Text
            className="text-[#9B9B9B] text-[14px] font-[450] leading-normal"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            You’ve never seen it before!
          </Text>
        </View>
        <Text
          className="text-[14px] text-[#222] font-[450] leading-normal"
          style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
        >
          view all
        </Text>
      </View>
      <View className="py-[46px] mx-4">
        <FlatList
          data={DATA}
          renderItem={renderSaleItem}
          bounces={false}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Container>
  );
};

export default CheckSale;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: 260,
  },
});
