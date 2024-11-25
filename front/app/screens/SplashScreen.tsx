import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = true; // Mock authentication logic
      navigation.replace(isAuthenticated ? 'HomeScreen' : 'RegisterScreen');
    };
  
    const timeoutId = setTimeout(checkAuth, 3000); // Call checkAuth after 3 seconds
  
    return () => clearTimeout(timeoutId); // Clean up timeout on unmount
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to SnapConnect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200 },
  text: { fontSize: 20, color: '#888', marginTop: 20 },
});

export default SplashScreen;
