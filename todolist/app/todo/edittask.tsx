import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { update } from '@/constants/quries/addtask';

const EditTask = () => {
  const { width, height } = Dimensions.get('screen');
  const { title, detail,id }:any = useLocalSearchParams();
  const [title1, setTitle] = useState(title);
  const [detail2, setDetail] = useState(detail);

  return (
    <SafeAreaView style={{ flex: 1, width, height, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" color="black" size={40} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Task</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          label="Title"
          mode="outlined"
          style={styles.textInput}
          value={title1}
          onChangeText={setTitle}
        />
        <TextInput
          label="Detail"
          mode="outlined"
          multiline
          style={styles.textInput}
          value={detail2}
          onChangeText={setDetail}
        />
        <Button
          mode="contained-tonal"
          onPress={() =>{update(title1,detail2,id)}}
          style={styles.button}
        >
          Update
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() =>{router.back()}}
          style={styles.button}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B7E0FF',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 8,
  },
  container: {
    padding: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#B7E0FF',
    marginBottom: 16,
  },
});

export default EditTask;
