import Toast from "react-native-toast-message";
import { TodoTask } from "../api/route"
import { router } from "expo-router";

export const addTask=async(title:string,detail:string,id:any)=>{
    try{
        const response=await TodoTask.AddTask(title,detail,id);
        if(response){
            Toast.show({type:"success",text1:'Task Addea successfully'})
            router.push("/(tabs)/")
        }
        
    }catch(e:any){
        Toast.show({type:"error",text1:"ERROR OCCURED",text2:e.message})
    }

}
export const update=async(title:string,detail:string,id:string)=>{
    try{
        const response=await TodoTask.Updatetask(title,detail,id);
        if(response){
            Toast.show({type:"success",text1:'Task updated successfully',text2:response.data.message})
        }
    }catch(e:any){
            Toast.show({type:"error",text1:'cannot update field',text2:e.message})
    }
}
export const deletetask=async(id:string)=>{
try{
    const response=await TodoTask.DeleteTask(id)
    console.log(response)
}catch(e:any){
    Toast.show({
        type:'error',text1:e.message
    })
}
}