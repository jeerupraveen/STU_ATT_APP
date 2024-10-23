import { Image, StyleSheet,Text,TouchableOpacity, Platform ,View, SafeAreaView} from 'react-native';
const logo =require("@/assets/images/splash.png")
import {router} from "expo-router"

export default function HomeScreen() {
  return (
    <>
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Explore the SRKREC</Text>
        <Text style={styles.description}>
          This APP FOR ATTENDENCE.
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>{router.push('/Auth/signin')}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={()=>{router.push("/Auth/signauth")}}>
          <Text style={styles.buttonOutlineText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Designed by <Text style={{fontWeight:"bold",color:"black"}}>TEAM AST</Text></Text>
      </View>
    </View>
    
    </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex:0.5,paddingLeft:20,
  },
  logo: {
    flex: 1,
    width:350,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.3,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: '#666',
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonOutlineText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
  footerContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    color: '#666',
  },
});