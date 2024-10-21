import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AnimatedFAB } from 'react-native-paper';
import { router } from 'expo-router';

const Todolist = () => {
  const { width } = Dimensions.get("window");
  const Array=[1,2,3,4,5,6,7,8,9,10]
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
          {Array.map((index) => (
            <View key={index} style={[styles.todoContainer, { width }]}>
              <View style={[styles.todoItem, { width: width - 20 }]}>
                <View style={styles.todoTextContainer}>
                  <Text>TODO TITLE</Text>
                  <Text>to do subtitle</Text>
                </View>
                <View style={styles.todoActions}>
                  <Entypo name="edit" size={24} color="black" style={{marginHorizontal:10}}
                  accessibilityRole='button' onPress={()=>router.push("/todo/addtask")}/>
                  <MaterialIcons name="delete" size={24} color="black" style={{marginHorizontal:10}}
                  accessibilityRole='button' onPress={()=>router.push("/todo/edittask")}/>
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
        onPress={() => { console.log("animatedFAB") }}
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