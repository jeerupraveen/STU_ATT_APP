import Toast from "react-native-toast-message";
import { Auth } from "../api/route"

export const forgetpwd=async(email:string,password:string)=>{
    try{
        const response=await Auth.ForgetPassword(email,password);
        console.log(response)
        if(response.status===200){
            Toast.show({
                type:'info',
                text1:"user updated",
                text2:"Changged password Successfully",
                visibilityTime:1000,
            })
        }
    }catch(e:any){
        console.log("erroe",e)
        Toast.show({type:"error",text1:"no user found with email",visibilityTime:1000})
    }
}