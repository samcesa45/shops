import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { TextInput } from "react-native";
import { View, Text, Pressable, Image,SafeAreaView } from "react-native";
import { Stack, TextInput } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../components/Container/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

type FormData = {
  username: string;
  email: string;
  password: string;
};

const schema = yup.object({
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
const RegisterScreen = ({ navigation }: Props) => {
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
     <Container isScrollable style={{ flex: 1 }}>
      <View className="w-full py-[53px] px-4 h-[812px] relative bg-stone-50">
        <View className="">
          <Text className="font-bold text-neutral-800 text-[34px]">
            Sign up
          </Text>
        </View>
        <View className="h-16 w-full flex-shrink-0 relative mt-[64px]  text-black  rounded shadow">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                // className=" text-zinc-800 bg-red-500 h-16 w-full text-[20px]  shadow   text-sm font-medium placeholder:px-4  leading-tight"
                label="Name"
                variant="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                cursorColor="black"
                trailing={(props) =>
                  !errors.username && (
                    <Icon color="#2AA952" name="check" size={24} />
                  )
                }
                color={`${errors.username ? "#DB3022" : "#2D2D2D"}`}
              />
            )}
            name="username"
          />
          <Text className="text-red-600 text-xs ml-9">
            {errors.username?.message}
          </Text>
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
                  cursorColor="black"
                  color={`${errors.email ? "#DB3022" : "#2D2D2D"}`}
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
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mt-2">
                <TextInput
                  secureTextEntry={true}
                  className=" text-zinc-800 bg-red-500 h-16 w-full text-[20px]  shadow   text-sm font-medium placeholder:px-4  leading-tight"
                  label="Password"
                  variant="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  cursorColor="black"
                  color={`${errors.password ? "#DB3022" : "#2D2D2D"}`}
                  trailing={(props) =>
                    !errors.password && (
                      <Icon color="#2AA952" name="check" size={24} />
                    )
                  }
                />
              </View>
            )}
            name="password"
          />

          <Text className="text-red-600 text-xs ml-9">
            {errors.password?.message}
          </Text>

          <Pressable
            className="mt-4"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-right text-[#222] text-sm font-medium">
              Already have an account?{" "}
              <Icon name="arrow-right" color="#DB3022" size={24} />
            </Text>
          </Pressable>
          <View className="mt-7 rounded-[25px]">
            {/* <Button title="SignUp" color="#DB3022" /> */}
            <Pressable
              className="rounded-[25px] bg-red-600 shadow h-12"
              style={({ pressed }) => [
                pressed && {
                  opacity: 0.8,
                  shadowColor: "rgba(211, 38, 38, 0.25)",
                },
              ]}
              onPress={onSubmit}
            >
              <Text className="text-center text-white text-sm font-medium leading-tight uppercase my-3.5">
                Sign Up
              </Text>
            </Pressable>
          </View>
          <View className="mt-[126px]">
            <Text className="text-[#222] text-sm h-5 text-center font-medium leading-tight">
              Or sign up with social account
            </Text>
          </View>
          <View className="flex flex-row mt-8 justify-center">
            <Image source={require("../../assets/google.png")} />
            <Image source={require("../../assets/facebook.png")} />
          </View>
          <View className="mt-[23px] flex flex-row justify-center"></View>
        </View>
      </View>
      </Container>
    </SafeAreaView>
  );
};

export default RegisterScreen;
