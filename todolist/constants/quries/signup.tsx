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
