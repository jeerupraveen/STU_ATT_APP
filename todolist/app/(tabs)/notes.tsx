import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper'
import {Feather,MaterialIcons} from '@expo/vector-icons';

const Note = () => {
  const{width,height}=Dimensions.get("window")
  const array=[1,2]
  return (<>
  <SafeAreaView style={{flex:1,width:width}}>
    <ScrollView style={{flex:1,backgroundColor:"white"}} showsVerticalScrollIndicator={false}>
      <View style={{flex:1,backgroundColor:"#B7E0FF",width:width,height:180,justifyContent:"center"}}>
        <Text style={{fontSize:24,alignSelf:"center",marginVertical:20}}>Note</Text>
        <Button mode="contained-tonal" onPress={()=>{console.log("ADD NOTE BUTTON")}}
          style={{backgroundColor:"white",width:width-50,alignSelf:"center"}}>ADD</Button>
      </View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center" ,width:width}}>
      {array.map((arr,index)=>(
        <View key={index} style={{flex:1,width:width-30,height:360,backgroundColor:"#B7E0FF",marginTop:30,borderTopColor:"red",borderTopWidth:3}}>
          <Text>HELLO</Text>
          <Feather name="edit" size={24} color="red" />
          <MaterialIcons name="delete" size={24} color="black" />
         </View>
      ))} 
      </View>
      <View style={{flex:1,width:width,height:30}}></View>
    </ScrollView>
  </SafeAreaView>
  </>
  )
}

export default Note