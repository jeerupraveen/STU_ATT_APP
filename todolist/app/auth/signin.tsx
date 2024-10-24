import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Uicomponent from '@/components/Uicomponent';
import { router } from 'expo-router';

const logo = require('@/assets/images/phoneman.jpg'); // Local image asset
const {width,height}=Dimensions.get("screen")
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Uicomponent>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      
      {/* Displaying the logo */}
      <Image source={logo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={()=>{router.push("/auth/forgetpass")}}>
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text>Create New an account?</Text>
        <TouchableOpacity onPress={()=>{router.push("/auth/signup")}}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Uicomponent>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  logo: {
    width: 150, // Adjust the width based on your needs
    height: 150, // Adjust the height based on your needs
    marginBottom: 30,
    resizeMode: 'contain', // Ensure the image fits nicely in the container
  },
  inputContainer: {
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width:width-60,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#4a90e2',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 8,
    width: width-60,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
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
