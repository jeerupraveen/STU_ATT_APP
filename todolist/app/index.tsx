import Uicomponent from '@/components/Uicomponent';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const logo = require('@/assets/images/phoneman.jpg');

const Start: React.FC = () => {

  return (
    <Uicomponent>
      <View style={styles.content}>
        <Image
          source={logo} // Using the imported image
          style={styles.phoneImage}
        />
        <Text style={styles.title}>Gets things done with TODO</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est eu vel
          pulvinar vulputate suspendisse mauris. Et nunc velit, quam cursus
          amet, quisque.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>{router.push("/auth/signin")}}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </Uicomponent>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  phoneImage: {
    width: 100,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7d7d7d',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Start;
