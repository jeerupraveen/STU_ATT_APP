import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTask } from '@/constants/quries/addtask';
import { router } from 'expo-router';

const AddTask = () => {
  const { width, height } = Dimensions.get('screen');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [userId, setUserId] = useState<any>();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userdata = await AsyncStorage.getItem('userdata');
        if (userdata) {
          setUserId(userdata);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserId();
  }, []);
  console.log("ADDTASK UERID",userId)
  const handleAddTask = () => {
    if (userId) {
      addTask(title, detail, userId);
    } else {
      console.error('User ID not found');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, width, height, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#B7E0FF', padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" color="black" size={40} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, marginLeft: 8 }}>Add Task</Text>
      </View>
      <View style={{ padding: 16 }}>
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Detail"
          mode="outlined"
          value={detail}
          onChangeText={setDetail}
          multiline
          style={{ marginBottom: 16 }}
        />
        <Button
          mode="contained-tonal"
          onPress={handleAddTask}
          style={{ backgroundColor: '#B7E0FF' }}
        >
          ADD
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;
