import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { api } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Student interface
interface Student {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  branch: string;
  year: number;
  regno: string;
}

// Initialize the student object
const initialStudent: Student = {
  id: '',
  name: '',
  email: '',
  phone_number: '',
  branch: '',
  year: 0,
  regno: ''
};

const Profile: React.FC = () => {
  const [student, setStudent] = useState<Student>(initialStudent);

  // Handle input changes
  const handleChange = (field: keyof Student, value: string) => {
    setStudent({ ...student, [field]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${api}/updateprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      const insertData = await response.json();

      // Handle response status
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Data submitted successfully:',
          text2: insertData.message || 'Data updated successfully!',
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error submitting data",
          text2: insertData.error || 'An unknown error occurred.',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: 'Error:',
        text2: error.message || 'Failed to connect to the server.',
      }); // Handle fetch error
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${api}/retriveuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: await AsyncStorage.getItem("email") }),
        });

        const data = await response.json();

        // Handle response status
        if (response.ok) {
          setStudent(data.response); // Assuming response contains the student object
        } else {
          Toast.show({
            type: "error",
            text1: "Error fetching data",
            text2: data.error || 'An unknown error occurred.',
          });
        }
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: 'Error:',
          text2: error.message || 'Failed to connect to the server.',
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust offset if necessary
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>PROFILE</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              onChangeText={(value) => handleChange('name', value)}
              value={student.name}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={(value) => handleChange('email', value)}
              value={student.email}
              style={styles.input}
              editable={false} // Prevent editing if you don't want to allow changes
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              onChangeText={(value) => handleChange('phone_number', value)}
              placeholder='Enter your phone number'
              value={student.phone_number}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Branch</Text>
            <TextInput
              onChangeText={(value) => handleChange('branch', value)}
              placeholder='Enter your branch'
              value={student.branch}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              onChangeText={(value) => handleChange('year', value)}
              placeholder='Enter your year'
              value={String(student.year)}
              style={styles.input}
              keyboardType='numeric' // Optional: restrict input to numbers
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>REGISTER NUMBER</Text>
            <TextInput
              onChangeText={(value) => handleChange('regno', value)}
              placeholder='Enter your year'
              value={student.regno} // Convert to string for TextInput
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={async() => {
            await AsyncStorage.removeItem("email");
            router.push("/Auth/signin")
          }}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
