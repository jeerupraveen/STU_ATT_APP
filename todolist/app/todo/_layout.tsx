import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TodoLayout = () => {
  return (<>
  <Stack>
    <Stack.Screen name="addtask" options={{ headerShown: false }}/>
    <Stack.Screen name="edittask" options={{ headerShown: false }}/>
  </Stack>
  
  </>
  )
}

export default TodoLayout