import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Start = () => {
    const {width,height}=Dimensions.get("screen")
  return (<><SafeAreaView>
    <View style={{backgroundColor:"white",width:width,height:height}}>
      <View style={{width:108,height:108,backgroundColor:'blue',alignSelf:"flex-start",borderBottomEndRadius:100,borderBottomStartRadius:100}}></View>
      <View style={{width:108,height:108,backgroundColor:'blue',alignSelf:"flex-start",borderTopEndRadius:100,borderBottomStartRadius:100}}></View>
    </View>
  </SafeAreaView></>)
}

export default Start