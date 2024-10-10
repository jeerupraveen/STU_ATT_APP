import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
const logo =require("@/assets/images/splash.png")
import { Link, router } from 'expo-router';
import { FontAwesome6, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React,{useState,useEffect}from 'react';


const Signauth = () => {
  const [signauth,setSigninAuth]=useState<boolean>(false)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground 
        source={logo} 
        style={styles.imageBackground}
      >
        <View style={styles.buttonContainer}>
        <Text style={{fontSize:30,marginBottom:30,fontWeight:"bold"}}>Explore the SRKREC</Text>
        <Text style={{fontSize:10,marginBottom:50,fontWeight:"bold",textAlign:"center"}}>
          Our App Description will go here. Please add this by asking info from Teja.
        </Text>
          {signauth&&<TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <FontAwesome6 name="google" size={24} color="black" />
              <Text style={styles.buttonText}>Continue With Google</Text>
            </View>
          </TouchableOpacity>}
          {signauth&&<TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="apple" size={24} color="black" />
              <Text style={styles.buttonText}>Continue With Apple</Text>
            </View>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.button} onPress={()=>{router.push("/Auth/signup")}}>
            <View style={styles.buttonContent}>
              <Ionicons name="mail" size={24} color="black" />
              <Text style={styles.buttonText}>Continue With Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <Text>Designed by <Text style={{ fontWeight: "bold", color: "black" }}>TEAM AST</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    marginBottom: 15,
    width: '95%',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  footer: {
    flex: 0.05,
    alignItems: "center",
  }
});

export default Signauth;
