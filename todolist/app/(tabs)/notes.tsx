import { View, Text, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Note = () => {
  const { width } = Dimensions.get("window");
  const array = [1, 2,3];
  const color = ["#FF77B7", "#FEEC37","#FEEC37"];

  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: "#B7E0FF", width: width, height: 180, justifyContent: "center", opacity: 0.5 }}>
          <Text style={{ fontSize: 24, alignSelf: "center", marginVertical: 20, color: "black",opacity:1 }}>Note</Text>
          <Button
            mode="contained-tonal"
            onPress={() => { console.log("ADD NOTE BUTTON") }}
            style={{ backgroundColor: "blue", width: width - 50, alignSelf: "center", opacity: 1 }}
          >
            Create Task
          </Button>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: width, backgroundColor: "#ffffff", shadowColor: "black" }}>
          {
          array.map((arr, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                width: width - 30,
                height: 360,
                backgroundColor: "#ffffff",
                marginTop: 30,
                borderTopColor: color[index],
                borderTopWidth: 3,
                shadowColor: "#000", 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.25, 
                shadowRadius: 3.84, 
                elevation: 5, 
                padding: 10, 
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color:'black',
                  backgroundColor: `rgba(${parseInt(color[index].slice(1, 3), 16)}, ${parseInt(color[index].slice(3, 5), 16)}, ${parseInt(color[index].slice(5, 7), 16)}, 0.1)`,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  alignSelf: 'flex-start',
                }}
              >
                Task
              </Text>
              <Text>Details</Text>
              <Feather name="edit" size={24} color={color[index]} style={{ position: "absolute", right: 16, bottom: 16 }} />
              <MaterialIcons name="delete" size={24} color={color[index]} style={{ position: "absolute", right: 46, bottom: 16 }} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Note;
