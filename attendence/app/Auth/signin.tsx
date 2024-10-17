import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
  Entypo
} from '@expo/vector-icons';
import { Divider, Button, Text as PaperText } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { api } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [mask, setMask] = React.useState<boolean>(true);
  const router = useRouter();

  const onSignin = async () => {
    try {
      const response = await fetch(`${api}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userName, password })
      });
      const responseData = await response.json();
      if (responseData.code === 2004) {
        await AsyncStorage.setItem("email",userName)
        await Toast.show({ type: 'success', text1: 'Login successful!' });
        await router.push('/(tabs)/');
      } else {
        Toast.show({ type: 'error', text1: 'Invalid email or password' });
      }
    } catch (error:any) {
      Toast.show({ type: 'error', text1: 'An error occurred', text2: error.message });
    }
  };

  const toggleMask = () => {
    setMask(!mask);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ImageBackground style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Hi, Welcome!</Text>

            <Text style={styles.label}>Email address</Text>
            <TextInput
              onChangeText={setUserName}
              placeholder="Your email"
              placeholderTextColor="#b3b3b3"
              value={userName}
              style={styles.input}
              accessibilityLabel="Email address"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#b3b3b3"
                secureTextEntry={mask}
                value={password}
                style={styles.passwordInput}
                accessibilityLabel="Password"
              />
              <Pressable onPress={toggleMask} style={styles.eyeIcon}>
                <Ionicons
                  name={mask ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="black"
                  accessibilityLabel={mask ? 'Show password' : 'Hide password'}
                />
              </Pressable>
            </View>

            <View style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                <Pressable style={styles.checkboxContainer} onPress={toggleMask}>
                  <Text>
                    {mask ? (
                      <AntDesign name="checkcircle" size={15} color="black" />
                    ) : (
                      <Entypo name="circle" size={15} color="black" />
                    )}
                  </Text>
                </Pressable>
                <Text style={styles.checkboxText}>Remember me</Text>
              </View>
              <Pressable>
                <Link href="/Auth/forgetpassword" asChild>
                  <Text style={styles.linkText}>Forgot Password</Text>
                </Link>
              </Pressable>
            </View>

            <Button
              mode="contained"
              onPress={onSignin}
              style={styles.button}
              labelStyle={{ color: 'white' }}
            >
              Login
            </Button>

            <View style={styles.dividerRow}>
              <Divider style={styles.divider} />
              <PaperText style={styles.orText}>Or With</PaperText>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome5 name="google" size={24} color="black" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="apple" size={24} color="black" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gmailContainer}>
              <TouchableOpacity style={styles.gmailButton}>
                <Ionicons name="mail" size={24} color="black" />
                <Text style={styles.socialText}>Gmail</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Link href="/Auth/signup" asChild>
                  <Text style={styles.linkText}>Sign up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 70 : 0
  },
  keyboardAvoidingView: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10
  },
  eyeIcon: {
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  checkboxContainer: {
    paddingRight: 10
  },
  checkboxText: {
    fontSize: 15
  },
  linkText: {
    color: '#007BFF',
    fontSize: 15
  },
  button: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 15
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc'
  },
  orText: {
    marginHorizontal: 10,
    color: '#888'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 150,
    marginHorizontal: 10
  },
  socialText: {
    marginLeft: 10
  },
  gmailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  gmailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 150
  },
  footer: {
    alignItems: 'center',
    marginTop: 10
  },
  footerText: {
    color: '#888'
  }
});

export default Signin;
