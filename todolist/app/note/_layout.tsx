import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Note_Layout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name="addNote" options={{headerShown:false}}/>
        <Stack.Screen name="updateNote" options={{headerShown:false}}/>
    </Stack>
    </>
  )
}

export default Note_Layout