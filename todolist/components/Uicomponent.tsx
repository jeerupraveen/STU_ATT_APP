import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet } from 'react-native';

interface UicomponentProps {
  children: React.ReactNode; // Use React.ReactNode for children prop
}

const Uicomponent: React.FC<UicomponentProps> = ({ children }) => {
  const { width, height } = Dimensions.get('screen');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: 'relative', width: width, height: height }}>
        <View style={styles.overlay1} />
        <View style={styles.overlay2} />
        {/* Place the children inside this View to ensure they are displayed correctly */}
        <View style={styles.contentContainer}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlay1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 216,
    height: 108,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 108,
    height: 216,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    borderTopRightRadius: 150,
    borderBottomRightRadius: 150,
  },
  contentContainer: {
    position: 'absolute', 
    top: 0,              
    left: 0,        
    right: 0,      
    bottom: 0,        
    justifyContent: 'center',
    alignItems: 'center', 
  },
});

export default Uicomponent;
