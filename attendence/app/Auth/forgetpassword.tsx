import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Forgetpassword = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [mask, setMask] = React.useState<boolean>(true);

  const toggleMask = () => {
    setMask(!mask);
  };

  const onSignin = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match!',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userName, password:password }),
      });

      const data = await response.json();
      console.log(data)
      if (data.code === 2004) {
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        router.push("/Auth/signin");
      } else {
        Toast.show({
          type: 'error',
          text1: data.message,
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred while updating the password.',
      });
    }
  };

  return (
    <PaperProvider>
      <ImageBackground style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>FORGET PASSWORD</Text>

          <Text>Email address</Text>
          <TextInput
            onChangeText={setUserName}
            placeholder="Your email"
            placeholderTextColor="#b3b3b3"
            value={userName}
            style={styles.input}
          />

          <Text>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={setPassword}
              placeholder="New Password"
              placeholderTextColor="#b3b3b3"
              secureTextEntry={mask}
              value={password}
              style={styles.passwordInput}
            />
            <Pressable onPress={toggleMask} style={styles.eyeIcon}>
              <Ionicons name={mask ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
            </Pressable>
          </View>

          <Text>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#b3b3b3"
              secureTextEntry={mask}
              value={confirmPassword}
              style={styles.passwordInput}
            />
            <Pressable onPress={toggleMask} style={styles.eyeIcon}>
              <Ionicons name={mask ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
            </Pressable>
          </View>

          <Button mode="contained" onPress={onSignin} style={styles.button} labelStyle={{ color: 'white' }}>
            Change Password
          </Button>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Have an account? <Link href={"/Auth/signin"} asChild><Text style={styles.linkText} >Sign in</Text></Link>
            </Text>
          </View>
        </View>
      </ImageBackground>
      <Toast />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: "100%",
    height: "100%",
  },
  container: {
    width: '100%',
    height: "100%",
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 50,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: '100%',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    marginVertical: 10,
  },
  footer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  linkText: {
    color: 'black',
  },
});

export default Forgetpassword;
