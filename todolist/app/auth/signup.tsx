import { View, Text, TextInput, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import React, { useState } from 'react';
import Uicomponent from '@/components/Uicomponent'; // Assuming this is a custom component
import { signup } from '@/constants/quries/signup';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
const { width } = Dimensions.get('window');
const Signup = () => {
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (<>
    <Uicomponent>
      <Text style={styles.titleText}>Welcome Onboard!</Text>
      <Text style={styles.subtitleText}>Let's help you to create an account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={()=>{signup(name,email,password)}}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={()=>{router.push("/auth/signin")}}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </Uicomponent>
    <Toast/></>
  );
};

export default Signup;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    justifyContent:"center",alignItems:"center"
  },
  input: {
    width:width-60,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 50,
    width:width-60,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#4a90e2',
    marginLeft: 5,
  },
});
