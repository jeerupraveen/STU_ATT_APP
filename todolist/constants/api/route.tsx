import axios from "axios"
import { addtask, deletetask, forgetpassword, retrivetask, signin, signup, updatetask } from "./api"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Auth={

    Signup:async(name:string,email:string,password:string)=>{
        return await axios.post(signup,{name:name,email:email,password:password})
    },

    Signin:async(email:string,password:string)=>{
        return await axios.post(signin,{email:email,password:password})
    },

    ForgetPassword:async(email:string,password:string)=>{
        return await axios.post(forgetpassword,{email:email,password:password})
    }
}

export const TodoTask={
    AddTask:async(title:string,detail:string,id:any)=>{
        return await axios.post(addtask,{title:title,detail:detail,UserId:id})
    },
    RetriveTask:async(id:string)=>{
        return await axios.post(retrivetask,{id:id})
    },
    DeleteTask:async(_id:string)=>{
        return await axios.post(deletetask,{id:_id})
    },
    Updatetask:async(title:string,detail:string,id:string)=>{
        return await axios.post(updatetask,{title:title,detail:detail,id:id})
    }
}