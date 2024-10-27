import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrected import
import { addTask, detailValidation, titleValidation } from '@/constants/quries/addtask';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const AddTask = () => {
  const { width, height } = Dimensions.get('screen');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userdata = await AsyncStorage.getItem('userdata');
        if (userdata) {
          setUserId(userdata);
        }
      } catch (error:any) {
        Toast.show({
          type:"error",text1:"Error fetching user data",text2:error.message
        })
      }
    };
    fetchUserId();
  }, []);

  const handleAddTask = () => {
    if (!title) {
      titleValidation(title);
    } else if (!detail) {
      detailValidation(detail);
    } else {
      if (userId) {
        addTask(title, detail, userId);
      } else {
        Toast.show({type:"info",text1:'User ID not found'})
      }
    }
  };

  return (<>
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
    <Toast />
    </>
  );
};

export default AddTask;
