import Toast from "react-native-toast-message";
import { TodoTask } from "../api/route"
import { router } from "expo-router";

export const addTask=async(title:string,detail:string,id:any)=>{
    try{
        const response=await TodoTask.AddTask(title,detail,id);
        if(response){
            Toast.show({type:"success",text1:'Task Added successfully'})
            setTimeout(()=>{
                router.push("/(tabs)/")
            },2000)
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
            setTimeout(()=>{
                router.push("/(tabs)/")
            },2000)
        }
    }catch(e:any){
            Toast.show({type:"error",text1:'cannot update field',text2:e.message})
    }
}
export const deletetask=async(id:string)=>{
try{
    const response=await TodoTask.DeleteTask(id)
    Toast.show({type:"success",text1:'Task deleted successfully',text2:response.data.message,visibilityTime:1000})
}catch(e:any){
    Toast.show({
        type:'error',text1:e.message,visibilityTime:1000
    })
}
}
export const titleValidation=(title:string)=>{
    if(!title){
        Toast.show({
            type:'info',
            text1:"Title Validation",
            text2:"Please enter a title"
        })
    }
}
export const detailValidation=(detail:string)=>{
    if(!detail){
        if(!detail){
            Toast.show({
                type:'info',
                text1:"Detail Validation",
                text2:"Please enter a Detail"
            })
        }
    }
}