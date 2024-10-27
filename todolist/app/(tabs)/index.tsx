import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AnimatedFAB } from 'react-native-paper';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrivetask } from '@/constants/api/api';
import axios from 'axios';
import { deletetask } from '@/constants/quries/addtask';
import Toast from 'react-native-toast-message';

const Todolist = () => {
  const [userid, setUserId] = useState<string>("");
  const [task, setTask] = useState([]);
  const { width } = Dimensions.get("window");

  const fetchUserIdAndTasks = async () => {
    const userId = await AsyncStorage.getItem("userdata");

    if (userId) {
      setUserId(userId);
      // console.log("INDEX", userId);  
      await retrivedata(userId);
    } else {
      Toast.show({
        type:"info",
        text1:"No user ID found in AsyncStorage"
      })
    }
  };

  const retrivedata = async (userid: string) => {
    try {
      const res = await axios.post(retrivetask, { userid });
      setTask(res.data); 
    } catch (error:any) {
      Toast.show({
        type:"error",
        text1:"Error retrieving tasks",
        text2:error.message
      })
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    try {
      setTask((prevTasks) => prevTasks.filter((t: any) => t._id !== taskId));
  
      await deletetask(taskId);
  
      await fetchUserIdAndTasks();

    } catch (error:any) {
      Toast.show({
        type:"error",
        text1:"Error deleting task",
        text2:error.message
      })
    }
  };
  
  

  useEffect(() => {
    fetchUserIdAndTasks();
  }, []); // Only run once when the component mounts

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.header, { width }]}>
            <Text style={styles.headerText}>TODOLIST</Text>
            <FontAwesome name="calendar" size={40} color="black" style={styles.calendarIcon} />
          </View>
          {task.length >0? ( // Check if tasks exist
            task.map((arr:any, index) => (
              <View key={index} style={[styles.todoContainer, { width }]}>
                <View style={[styles.todoItem, { width: width - 20 }]}>
                  <View style={styles.todoTextContainer}>
                    <Text>{arr.Title}</Text>
                    <Text>{arr.Detail}</Text>
                  </View>
                  <View style={styles.todoActions}>
                    <Entypo 
                      name="edit" 
                      size={24} 
                      color="black" 
                      style={{ marginHorizontal: 10 }}
                      accessibilityRole='button'
                      onPress={() => router.push(`/todo/edittask?title=${encodeURIComponent(arr.Title)}&detail=${encodeURIComponent(arr.Detail)}&id=${encodeURIComponent(arr._id)}`)} 
                    />
                    <MaterialIcons 
                      name="delete" 
                      size={24} 
                      color="black" 
                      style={{ marginHorizontal: 10 }}
                      accessibilityRole='button'
                      onPress={() => {handleDeleteTask(arr._id) }} 
                    />
                    <AntDesign 
                      name="checkcircleo" 
                      size={24} 
                      color="black" 
                      style={{ marginHorizontal: 10 }} 
                    />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noTasksText}>No tasks available</Text> // Message when no tasks
          )}
          <View style={styles.scrollEndSpacer} />
        </ScrollView>
      </SafeAreaView>
      <AnimatedFAB
        extended={false}
        icon="plus"
        onPress={() => { router.push("/todo/addtask"); }}
        visible={true}
        label="plus"
        style={styles.fab}
      />
      <Toast/>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#B7E0FF",
    justifyContent: "center",
    alignItems: "center",
    height: 108,
  },
  headerText: {
    flex: 1,
    fontSize: 40,
    marginLeft: 20,
    color: "white",
  },
  calendarIcon: {
    marginRight: 20,
  },
  todoContainer: {
    flex: 1,
    alignItems: "center",
  },
  todoItem: {
    flex: 1,
    height: 100,
    backgroundColor: "#B7E0FF",
    marginTop: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
  },
  todoTextContainer: {
    flex: 1,
    marginLeft: 30,
  },
  todoActions: {
    flexDirection: "row",
    marginRight: 20,
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "white",
  },
  scrollEndSpacer: {
    height: 100,  // Adjust the height as per your requirement
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});

export default Todolist;
