// queries.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../api/route";
import Toast from 'react-native-toast-message';
import { router } from "expo-router";

export const signin = async (email: string, password: string) => {
  try {
    const res = await Auth.Signin(email, password);
    if (res.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in 👋',
        visibilityTime: 1000
      });
      await AsyncStorage.setItem("userdata",res?.data?.userId)
      setTimeout(() => {
        router.push("/(tabs)/");
      }, 2000);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid email or password',
        visibilityTime: 1000
      });
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: 'Check login Credentials',
      visibilityTime: 1000
    });
  }
};
