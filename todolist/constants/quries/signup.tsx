import { Alert } from "react-native";
import { Auth } from "../api/route";
import Toast from "react-native-toast-message";

export const signup = async (name: string,email: string, password: string) => {
  try {
    const response = await Auth.Signup(name,email, password) ;
    // console.log({response});

    if (response.status===201) {
      Toast.show({
        type: "success",
        text1: "Data Inserted",
        text2: "New Account Created",
        visibilityTime:1000
      });
    } 
  } catch (error:any) {
    if(error.response.status===400){
    Toast.show({
      type: "info",
      text1: "Duplicate Error",
      text2: "A user with this email already exists",
      visibilityTime:1000
    });
  }else{
    Toast.show({
      type: "error",
      text1: "API Error",
      text2: "An error occurred while fetching data",
      visibilityTime:1000
    });
  }}
};
export const emailValidation = (email: string) => {
  if (!email) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please enter an email",
      visibilityTime: 1000,
    });
  }
};

export const nameValidation = (name: string) => {
  if (!name) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please enter a name",
      visibilityTime: 1000,
    });
  }
};

export const confirmPasswordValidation = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please enter a password",
      visibilityTime: 1000,
    });
  } else if (password !== confirmPassword) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Passwords do not match",
      visibilityTime: 1000,
    });
  }
};

export const passwordValidation = (password: string) => {
  if (!password) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please enter a password",
      visibilityTime: 1000,
    });
  }
};