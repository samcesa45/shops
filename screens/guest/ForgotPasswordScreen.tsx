import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Pressable, Image,SafeAreaView } from "react-native";
import { Stack, TextInput } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

type FormData = {
  email: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
});
const ForgotPasswordScreen = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full px-4 h-[812px] relative bg-stone-50">
        <View className="pt-[106px]">
          <Text className="font-bold text-neutral-800 text-[34px]">
            Forgot password
          </Text>
        </View>
        <View className="h-16 w-full flex-shrink-0 relative mt-[64px]  text-black  rounded shadow">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mt-2">
                <TextInput
                  className=" text-zinc-800 bg-red-500 h-16 w-full text-[20px]  shadow   text-sm font-medium placeholder:px-4  leading-tight"
                  label="Email"
                  variant="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={`${errors.email ? "#DB3022" : "#2AA952"}`}
                  trailing={(props) =>
                    !errors.email && (
                      <Icon color="#2AA952" name="check" size={24} />
                    )
                  }
                />
              </View>
            )}
            name="email"
          />
          <Text className="text-red-600 text-xs ml-9">
            {errors.email?.message}
          </Text>

          <View className="mt-[55px] rounded-[25px]">
            {/* <Button title="SignUp" color="#DB3022" /> */}
            <Pressable
              className="rounded-[25px] bg-red-600 shadow h-12"
              style={({ pressed }) => [
                pressed && {
                  opacity: 0.8,
                  shadowColor: "rgba(211, 38, 38, 0.25)",
                  backgroundColor: "blue",
                },
              ]}
              onPress={onSubmit}
            >
              <Text className="text-center text-white text-sm font-medium leading-tight uppercase my-3.5">
                Send
              </Text>
            </Pressable>
          </View>

          {/* <View className="mt-[347px] flex flex-row justify-center">
            <View className="w-[134px] h-1.5 bg-[#222]"></View>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
