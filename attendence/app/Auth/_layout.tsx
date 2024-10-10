import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="signin" options={{headerShown:false}}/>
      <Stack.Screen name="signup" options={{headerShown:false}}/>
      <Stack.Screen name="signauth" options={{headerShown:false}}/>
      <Stack.Screen name="forgetpassword" options={{headerShown:false}}/>
    </Stack>
  )
}

export default AuthLayout