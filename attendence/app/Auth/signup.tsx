import { View, Text, ImageBackground, StyleSheet, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
const logo = require('@/assets/images/icon.png');
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { api } from '@/constants/api';

const Signup = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [mask, setMask] = useState<boolean>(true);
  const [conmask, setConMask] = useState<boolean>(true);

  const toggleMask = () => {
    setMask(!mask);
  };

  const toggleConMask = () => {
    setConMask(!conmask);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Toast.show({ type: 'info', text1: 'Passwords do not match' });
      return;
    }
    if (!email) {
      Toast.show({ type: 'info', text1: 'Please enter an email' });
      return;
    }

    try {
      const response = await fetch(`${api}/insertdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const responseData = await response.json();
      if(response.ok) {
        Toast.show({ type: "success", text1: responseData.message });
      } else {
        Toast.show({ type: "error", text1: responseData.error,text2:"Already user exist with email" });
      }
    } catch (error:any) {
      Toast.show({ type: "error", text1: error.message });
    }
  }

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
        <ImageBackground style={styles.imageBackground}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
              placeholder='Email address'
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Password'
                secureTextEntry={mask}
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={toggleMask}>
                {mask ? 
                  <Ionicons name="eye-outline" size={24} color="black" /> :
                  <Ionicons name="eye-off-outline" size={24} color="black" />}
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Confirm password'
                secureTextEntry={conmask}
                style={styles.inputField}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={toggleConMask}>
                {conmask ? 
                  <Ionicons name="eye-outline" size={24} color="black" /> :
                  <Ionicons name="eye-off-outline" size={24} color="black" />}
              </Pressable>
            </View>
            <Pressable 
              onPress={handleSignup} 
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountButtonText}>Create an Account</Text>
            </Pressable>
            <Text style={styles.terms}>
              By creating an account or signing in you agree to our
              <Link href="/Auth/signin"> <Text style={{ fontWeight: "bold", fontSize: 12 }}>SIGNIN</Text></Link>
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.footer}>
          <Text>Designed by <Text style={{ fontWeight: "bold", color: "black" }}>TEAM AST</Text></Text>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#F0F3FB"
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "grey",
    backgroundColor: "white",
    width: "95%",
    height: 50,
    padding: 10,
    marginBottom: 30,
    borderRadius: 15,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    fontWeight: "200",
    color: "black",
  },
  input: {
    borderColor: "grey",
    backgroundColor: "white",
    width: "95%",
    height: 50,
    padding: 10,
    marginBottom: 30,
    borderRadius: 15,
    fontSize: 15,
    fontWeight: "200",
    color: "black",
  },
  createAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "grey",
    borderRadius: 15,
    backgroundColor: "black",
    width: "95%",
    height: 50,
    padding: 10,
    marginBottom: 30,
  },
  createAccountButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  terms: {
    fontSize: 10,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flex: 0.05,
    alignItems: "center",
  }
});

export default Signup;
