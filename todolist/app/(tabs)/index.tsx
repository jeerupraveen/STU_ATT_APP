import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AnimatedFAB } from 'react-native-paper';
import { router } from 'expo-router';

const Todolist = () => {
  const { width } = Dimensions.get("window");
  const Array = [
    { id: 1, title: 'Task 1', detail: 'Detail of Task 1' },
    { id: 2, title: 'Task 2', detail: 'Detail of Task 2' },
    { id: 3, title: 'Task 3', detail: 'Detail of Task 3' },
    { id: 4, title: 'Task 4', detail: 'Detail of Task 4' },
  ];
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
          {Array.map((arr,index) => (
            <View key={index} style={[styles.todoContainer, { width }]}>
              <View style={[styles.todoItem, { width: width - 20 }]}>
                <View style={styles.todoTextContainer}>
                  <Text>{arr.title}</Text>
                  <Text>{arr.detail}</Text>
                </View>
                <View style={styles.todoActions}>
                  <Entypo name="edit" size={24} color="black" style={{marginHorizontal:10}}
                  accessibilityRole='button' onPress={()=>router.push(`/todo/edittask?title=${encodeURIComponent(arr.title)}&detail=${encodeURIComponent(arr.detail)}`)}/>
                  <MaterialIcons name="delete" size={24} color="black" style={{marginHorizontal:10}}
                  accessibilityRole='button' onPress={()=>{console.log("deleted succseffuly")}}/>
                  <AntDesign name="checkcircleo" size={24} color="black" style={{marginHorizontal:10}} />
                </View>
              </View>
            </View>
          ))}
          <View style={styles.scrollEndSpacer} />
        </ScrollView>
      </SafeAreaView>
      <AnimatedFAB
        extended={false}
        icon="plus"
        onPress={() => {router.push("/todo/addtask")}}
        visible={true}
        label="plus"
        style={styles.fab}
      />
    </>
  );
}

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
});

export default Todolist;