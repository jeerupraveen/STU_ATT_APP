import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Toast from 'react-native-toast-message'

const Authlayout = () => {
  return (
    <Stack>
        <Stack.Screen name="signin" options={{headerShown:false}}/>
        <Stack.Screen name="forgetpass" options={{headerShown:false}}/>
        <Stack.Screen name="signup" options={{headerShown:false}}/>
    </Stack>
  )
}

export default Authlayout