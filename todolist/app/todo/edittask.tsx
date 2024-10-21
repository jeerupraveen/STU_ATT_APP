import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';

const EditTask = () => {
  const { width, height } = Dimensions.get('screen');

  return (
    <SafeAreaView style={{ flex: 1, width, height, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#B7E0FF', padding: 16 }}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <MaterialIcons name="arrow-back" color="black" size={40} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, marginLeft: 8 }}>Edit Task</Text>
      </View>
      <View style={{ padding: 16 }}>
        <TextInput
          label="Title"
          mode="outlined"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Detail"
          mode="outlined"
          multiline
          style={{ marginBottom: 16 }}
        />
        <Button
          mode="contained-tonal"
          onPress={() => console.log('update')}
          style={{ backgroundColor: '#B7E0FF', marginBottom: 16 }}
        >
          Update
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => console.log('cancel')}
          style={{ backgroundColor: '#B7E0FF', }}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default EditTask;
